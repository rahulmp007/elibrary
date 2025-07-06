const express = require("express");
const libraryController = require("../controllers/library.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const { libraryValidation, addBookToLibraryValidation } = require("../validators/library.validator");
const { USER_ROLES } = require("../config/constants");
const router = express.Router();

router.get("/", authenticate, libraryController.getAllLibraries);
router.get("/:id", authenticate, libraryController.getLibraryById);

router.post(
  "/",
  authenticate,
  authorize(USER_ROLES.LIBRARIAN), 
  libraryValidation,
  libraryController.createLibrary,
);
router.put(
  "/:id",
  authenticate,
  authorize(USER_ROLES.LIBRARIAN), 
  libraryController.updateLibrary,
);
router.delete(
  "/:id",
  authenticate,
  authorize(USER_ROLES.LIBRARIAN), 
  libraryController.deleteLibrary,
);

router.get(
  "/:id/inventory",
  authenticate,
  libraryController.getLibraryInventory,
);

router.post(
  "/:id/inventory",
  authenticate,
  authorize(USER_ROLES.LIBRARIAN), 
  addBookToLibraryValidation,
  libraryController.addBookToLibrary,
);
router.delete(
  "/:id/inventory/:bookId",
  authenticate,
  authorize(USER_ROLES.LIBRARIAN), 
  libraryController.removeBookFromLibrary,
);

module.exports = router;