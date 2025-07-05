const express = require("express");
const bookController = require("../controllers/book.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares/upload.middleware");
const { bookValidation, updateBookValidation } = require("../validators/book.validator");
const { USER_ROLES } = require("../config/constants");

const router = express.Router();

router.get("/", authenticate, bookController.getAllBooks);
router.get("/:id", authenticate, bookController.getBookById);
router.post(
  "/",
  authenticate,
  authorize(USER_ROLES.AUTHOR),
  upload.single("image"),
  bookValidation,
  bookController.createBook,
);
router.put(
  "/:id",
  authenticate,
  authorize(USER_ROLES.AUTHOR),
  upload.single("image"),
  updateBookValidation,
  bookController.updateBook,
);
router.delete(
  "/:id",
  authenticate,
  authorize(USER_ROLES.AUTHOR),
  bookController.deleteBook,
);

module.exports = router;
