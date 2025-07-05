const express = require("express");
const libraryController = require("../controllers/library.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const { libraryValidation, addBookToLibraryValidation } = require("../validators/library.validator");
const { USER_ROLES } = require("../config/constants");
const router = express.Router();

// Public read operations - all authenticated users can view libraries
router.get("/", authenticate, libraryController.getAllLibraries);
router.get("/:id", authenticate, libraryController.getLibraryById);

// Library CRUD operations - only LIBRARIAN can manage libraries
router.post(
  "/",
  authenticate,
  authorize(USER_ROLES.LIBRARIAN), // CHANGED: was AUTHOR, now LIBRARIAN
  libraryValidation,
  libraryController.createLibrary,
);
router.put(
  "/:id",
  authenticate,
  authorize(USER_ROLES.LIBRARIAN), // CHANGED: was AUTHOR, now LIBRARIAN
  libraryController.updateLibrary,
);
router.delete(
  "/:id",
  authenticate,
  authorize(USER_ROLES.LIBRARIAN), // CHANGED: was AUTHOR, now LIBRARIAN
  libraryController.deleteLibrary,
);

// Inventory routes - all authenticated users can view inventory
router.get(
  "/:id/inventory",
  authenticate,
  libraryController.getLibraryInventory,
);

// Inventory management - only LIBRARIAN can manage inventory
router.post(
  "/:id/inventory",
  authenticate,
  authorize(USER_ROLES.LIBRARIAN), // CHANGED: was AUTHOR, now LIBRARIAN
  addBookToLibraryValidation,
  libraryController.addBookToLibrary,
);
router.delete(
  "/:id/inventory/:bookId",
  authenticate,
  authorize(USER_ROLES.LIBRARIAN), // CHANGED: was AUTHOR, now LIBRARIAN
  libraryController.removeBookFromLibrary,
);

module.exports = router;