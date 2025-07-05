const express = require("express");
const borrowController = require("../controllers/borrow.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const { borrowValidation } = require("../validators/borrow.validator");
const { USER_ROLES } = require("../config/constants");


const router = express.Router();

// Borrow a book - POST /api/borrow
router.post(
  "/",
  authenticate,
  authorize(USER_ROLES.BORROWER),
  borrowValidation,
  borrowController.borrowBook,
);

// Return a book - PUT /api/borrow/return/:id (FIXED: was /return/:id)
router.put(
  "/return/:id",
  authenticate,
  authorize(USER_ROLES.BORROWER),
  borrowController.returnBook,
);

// Get borrowed books by user
router.get(
  "/borrowed",
  authenticate,
  authorize(USER_ROLES.BORROWER),
  borrowController.getBorrowedBooks,
);

module.exports = router;