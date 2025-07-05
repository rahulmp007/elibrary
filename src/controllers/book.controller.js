const bookService = require("../services/book.service");
const { MESSAGES } = require("../config/constants");

class BookController {
  async getAllBooks(req, res, next) {
    try {
      const result = await bookService.getAllBooks(req.query, req.user._id);
      res.sendLocalizedSuccess("BOOKS_RETRIEVED", result);
    } catch (error) {
      next(error);
    }
  }

  async getBookById(req, res, next) {
    try {
      const book = await bookService.getBookById(req.params.id);
      res.sendLocalizedSuccess("BOOK_RETRIEVED", { book });
    } catch (error) {
      next(error);
    }
  }

  async createBook(req, res, next) {
    try {
      const book = await bookService.createBook(
        req.body,
        req.user._id,
        req.file,
      );
      res.sendLocalizedCreated("BOOK_CREATED", { book });
    } catch (error) {
      next(error);
    }
  }

  async updateBook(req, res, next) {
    try {
      const book = await bookService.updateBook(
        req.params.id,
        req.body,
        req.user._id,
        req.file,
      );
      res.sendLocalizedSuccess("BOOK_UPDATED", { book });
    } catch (error) {
      next(error);
    }
  }

  async deleteBook(req, res, next) {
    try {
      await bookService.deleteBook(req.params.id, req.user._id);
      res.sendLocalizedSuccess("BOOK_DELETED");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookController();