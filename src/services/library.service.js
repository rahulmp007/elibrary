const Library = require("../models/library.model");
const Book = require("../models/book.model");
const { HTTP_STATUS, MESSAGES } = require("../config/constants");
const { getPaginationOptions, createPaginationResponse } = require("../utils/pagination");


class LibraryService {
  async getAllLibraries(query) {
    const { page, limit, skip } = getPaginationOptions(query);

    const libraries = await Library.find({ isActive: true })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const totalCount = await Library.countDocuments({ isActive: true });

    return createPaginationResponse(libraries, totalCount, page, limit);
  }

  async getLibraryById(libraryId) {
    const library = await Library.findById(libraryId);

    if (!library) {
      const error = new Error(MESSAGES.LIBRARY_NOT_FOUND);
      error.statusCode = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    const books = await Book.find({ library: libraryId })
      .populate("author", "name email role")
      .populate("borrower", "name email role")
      .sort({ createdAt: -1 });

    return {
      ...library.toJSON(),
      books,
    };
  }

  async createLibrary(libraryData) {
    const library = new Library(libraryData);
    await library.save();
    return library;
  }

  async updateLibrary(libraryId, libraryData) {
    const library = await Library.findByIdAndUpdate(libraryId, libraryData, {
      new: true,
      runValidators: true,
    });

    if (!library) {
      const error = new Error(MESSAGES.LIBRARY_NOT_FOUND);
      error.statusCode = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    return library;
  }

  async deleteLibrary(libraryId) {
    const library = await Library.findById(libraryId);

    if (!library) {
      const error = new Error(MESSAGES.LIBRARY_NOT_FOUND);
      error.statusCode = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    const booksCount = await Book.countDocuments({ library: libraryId });
    if (booksCount > 0) {
      const error = new Error("Cannot delete library with existing books");
      error.statusCode = HTTP_STATUS.BAD_REQUEST;
      throw error;
    }

    await Library.findByIdAndDelete(libraryId);
  }

  async getLibraryInventory(libraryId, query) {
    const { page, limit, skip } = getPaginationOptions(query);
    const { available } = query;

    let bookQuery = { library: libraryId };
    if (available !== undefined) {
      bookQuery.isAvailable = available === "true";
    }

    const books = await Book.find(bookQuery)
      .populate("author", "name email")
      .populate("borrower", "name email")
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    const totalCount = await Book.countDocuments(bookQuery);

    return createPaginationResponse(books, totalCount, page, limit);
  }

  async addBookToLibrary(libraryId, bookId) {
    const library = await Library.findById(libraryId);
    if (!library) {
      const error = new Error(MESSAGES.LIBRARY_NOT_FOUND);
      error.statusCode = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    const book = await Book.findByIdAndUpdate(
      bookId,
      { library: libraryId },
      { new: true },
    ).populate("author", "name email");

    if (!book) {
      const error = new Error(MESSAGES.BOOK_NOT_FOUND);
      error.statusCode = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    return book;
  }

  async removeBookFromLibrary(libraryId, bookId) {
    const book = await Book.findById(bookId);

    if (!book) {
      const error = new Error(MESSAGES.BOOK_NOT_FOUND);
      error.statusCode = HTTP_STATUS.NOT_FOUND;
      throw error;
    }

    if (book.library.toString() !== libraryId) {
      const error = new Error("Book does not belong to this library");
      error.statusCode = HTTP_STATUS.BAD_REQUEST;
      throw error;
    }

    if (!book.isAvailable) {
      const error = new Error("Cannot remove a borrowed book");
      error.statusCode = HTTP_STATUS.BAD_REQUEST;
      throw error;
    }

    await Book.findByIdAndDelete(bookId);
  }
}

module.exports = new LibraryService();
