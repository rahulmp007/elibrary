const libraryService = require("../services/library.service");
const { MESSAGES } = require("../config/constants");

class LibraryController {
  async getAllLibraries(req, res, next) {
    try {
      const result = await libraryService.getAllLibraries(req.query);
      res.sendLocalizedSuccess("LIBRARIES_RETRIEVED", result);
    } catch (error) {
      next(error);
    }
  }

  async getLibraryById(req, res, next) {
    try {
      const library = await libraryService.getLibraryById(req.params.id);
      res.sendLocalizedSuccess("LIBRARY_RETRIEVED", { library });
    } catch (error) {
      next(error);
    }
  }

  async createLibrary(req, res, next) {
    try {
      const library = await libraryService.createLibrary(req.body);
      res.sendLocalizedCreated("LIBRARY_CREATED", { library });
    } catch (error) {
      next(error);
    }
  }

  async updateLibrary(req, res, next) {
    try {
      const library = await libraryService.updateLibrary(
        req.params.id,
        req.body
      );
      res.sendLocalizedSuccess("LIBRARY_UPDATED", { library });
    } catch (error) {
      next(error);
    }
  }

  async deleteLibrary(req, res, next) {
    try {
      await libraryService.deleteLibrary(req.params.id);
      res.sendLocalizedSuccess("LIBRARY_DELETED");
    } catch (error) {
      next(error);
    }
  }

  async getLibraryInventory(req, res, next) {
    try {
      const result = await libraryService.getLibraryInventory(
        req.params.id,
        req.query
      );
      res.sendLocalizedSuccess("LIBRARY_INVENTORY_RETRIEVED", result);
    } catch (error) {
      next(error);
    }
  }

  async addBookToLibrary(req, res, next) {
    try {
      const book = await libraryService.addBookToLibrary(
        req.params.id,
        req.body.bookId
      );
      res.sendLocalizedSuccess("BOOK_ADDED_TO_LIBRARY", { book });
    } catch (error) {
      next(error);
    }
  }

  async removeBookFromLibrary(req, res, next) {
    try {
      await libraryService.removeBookFromLibrary(
        req.params.id,
        req.params.bookId
      );
      res.sendLocalizedSuccess("BOOK_REMOVED_FROM_LIBRARY");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LibraryController();