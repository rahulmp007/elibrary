const borrowService = require("../services/borrow.service");
const { MESSAGES } = require("../config/constants");

class BorrowController {
  async borrowBook(req, res, next) {
    try {
      const result = await borrowService.borrowBook(
        req.body.bookId,
        req.user._id,
        req.body.days,
      );
      res.sendLocalizedSuccess("BOOK_BORROWED", result);
    } catch (error) {
      next(error);
    }
  }

  async returnBook(req, res, next) {
    try {
      const result = await borrowService.returnBook(
        req.params.id,
        req.user._id,
      );
      res.sendLocalizedSuccess("BOOK_RETURNED", result);
    } catch (error) {
      next(error);
    }
  }

  async getBorrowedBooks(req, res, next) {
    try {
      const books = await borrowService.getBorrowedBooks(req.user._id);
      res.sendLocalizedSuccess("BORROWED_BOOKS_RETRIEVED", { books });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BorrowController();