const Book = require("../models/book.model");
const Library = require("../models/library.model");
const { HTTP_STATUS, MESSAGES } = require("../config/constants");
const { getPaginationOptions, createPaginationResponse } = require("../utils/pagination");
const uploadService = require("./upload.service");

class BookService {
  async getAllBooks(query, userId) {
    const { page, limit, skip } = getPaginationOptions(query);
    const { search } = query;

    let searchQuery = {};

    if (search) {
      searchQuery.$text = { $search: search };
    }

    const books = await Book.find(searchQuery)
      .populate("author", "name email role")
      .populate("library", "name address")
      .populate("borrower", "name email role")
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const totalCount = await Book.countDocuments(searchQuery);

    return createPaginationResponse(books, totalCount, page, limit);
  }

  async getBookById(bookId) {
    const book = await Book.findById(bookId)
      .populate("author", "name email role phone address")
      .populate("library", "name address phone email")
      .populate("borrower", "name email role phone");

    if (!book) {
      const error = new Error(MESSAGES.BOOK_NOT_FOUND);
      error.statusCode = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    return book;
  }

  async createBook(bookData, authorId, imageFile) {
    // Verify library exists
    const library = await Library.findById(bookData.library);
    if (!library) {
      const error = new Error(MESSAGES.LIBRARY_NOT_FOUND);
      error.statusCode = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    let imageUrl = null;
    if (imageFile) {
      imageUrl = await uploadService.uploadToFirebase(imageFile);
    }

    const book = new Book({
      ...bookData,
      author: authorId,
      image: imageUrl,
    });

    await book.save();

    await book.populate([
      { path: "author", select: "name email role" },
      { path: "library", select: "name address" },
    ]);

    return book;
  }

  async updateBook(bookId, bookData, authorId, imageFile) {
    const book = await Book.findById(bookId);

    if (!book) {
      const error = new Error(MESSAGES.BOOK_NOT_FOUND);
      error.statusCode = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    // Check if user is the author
    if (book.author.toString() !== authorId.toString()) {
      const error = new Error(MESSAGES.FORBIDDEN);
      error.statusCode = HTTP_STATUS.FORBIDDEN;
      throw error;
    }

    let imageUrl = book.image;
    if (imageFile) {
      // Delete old image if exists
      if (book.image) {
        await uploadService.deleteFromFirebase(book.image);
      }
      imageUrl = await uploadService.uploadToFirebase(imageFile);
    }

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { ...bookData, image: imageUrl },
      { new: true, runValidators: true },
    ).populate([
      { path: "author", select: "name email role" },
      { path: "library", select: "name address" },
      { path: "borrower", select: "name email role" },
    ]);

    return updatedBook;
  }

  async deleteBook(bookId, authorId) {
    const book = await Book.findById(bookId);

    if (!book) {
      const error = new Error(MESSAGES.BOOK_NOT_FOUND);
      error.statusCode = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    // Check if user is the author
    if (book.author.toString() !== authorId.toString()) {
      const error = new Error(MESSAGES.FORBIDDEN);
      error.statusCode = HTTP_STATUS.FORBIDDEN;
      throw error;
    }

    // Check if book is currently borrowed
    if (!book.isAvailable) {
      const error = new Error("Cannot delete a borrowed book");
      error.statusCode = HTTP_STATUS.BAD_REQUEST;
      throw error;
    }

    // Delete image if exists
    if (book.image) {
      await uploadService.deleteFromFirebase(book.image);
    }

    await Book.findByIdAndDelete(bookId);
  }
}

module.exports = new BookService();
