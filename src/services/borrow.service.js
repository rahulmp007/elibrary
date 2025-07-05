const Book = require("../models/book.model");
const { HTTP_STATUS, MESSAGES } = require("../config/constants");
const config = require("../config");

class BorrowService {
  async borrowBook(bookId, borrowerId, days) {
    const book = await Book.findById(bookId)
      .populate("author", "name email")
      .populate("library", "name address");

    if (!book) {
      const error = new Error(MESSAGES.BOOK_NOT_FOUND);
      error.statusCode = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    if (!book.isAvailable) {
      const error = new Error(MESSAGES.BOOK_ALREADY_BORROWED);
      error.statusCode = HTTP_STATUS.BAD_REQUEST;
      throw error;
    }

    if (days > config.MAX_BORROW_DAYS) {
      const error = new Error(
        `Cannot borrow for more than ${config.MAX_BORROW_DAYS} days`,
      );
      error.statusCode = HTTP_STATUS.BAD_REQUEST;
      throw error;
    }

    // Calculate due date and charges
    const borrowedAt = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + days);

    const totalCharge = book.borrowingCharge * days;

    // Update book
    book.borrower = borrowerId;
    book.borrowedAt = borrowedAt;
    book.dueDate = dueDate;
    book.isAvailable = false;

    await book.save();
    await book.populate("borrower", "name email");

    return {
      book,
      borrowingDetails: {
        borrowedAt,
        dueDate,
        days,
        totalCharge,
      },
    };
  }

  async returnBook(bookId, borrowerId) {
    const book = await Book.findById(bookId)
      .populate("author", "name email")
      .populate("library", "name address")
      .populate("borrower", "name email");

    if (!book) {
      const error = new Error(MESSAGES.BOOK_NOT_FOUND);
      error.statusCode = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    if (book.isAvailable || !book.borrower) {
      const error = new Error(MESSAGES.BOOK_NOT_BORROWED);
      error.statusCode = HTTP_STATUS.BAD_REQUEST;
      throw error;
    }

    // Check if user is the borrower
    if (book.borrower._id.toString() !== borrowerId.toString()) {
      const error = new Error(MESSAGES.FORBIDDEN);
      error.statusCode = HTTP_STATUS.FORBIDDEN;
      throw error;
    }

    // Calculate late fee if overdue
    const returnDate = new Date();
    const isOverdue = returnDate > book.dueDate;
    const overdueDays = isOverdue
      ? Math.ceil((returnDate - book.dueDate) / (1000 * 60 * 60 * 24))
      : 0;
    const lateFee = overdueDays * config.DEFAULT_LATE_FEE_PER_DAY;

    // Update book
    book.borrower = null;
    book.borrowedAt = null;
    book.dueDate = null;
    book.isAvailable = true;

    await book.save();

    return {
      book,
      returnDetails: {
        returnDate,
        isOverdue,
        overdueDays,
        lateFee,
      },
    };
  }

  async getBorrowedBooks(borrowerId) {
    const books = await Book.find({
      borrower: borrowerId,
      isAvailable: false,
    })
      .populate("author", "name email")
      .populate("library", "name address")
      .sort({ borrowedAt: -1 });

    return books;
  }
}

module.exports = new BorrowService();
