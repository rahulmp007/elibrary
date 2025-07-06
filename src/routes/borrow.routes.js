const express = require("express");
const borrowController = require("../controllers/borrow.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const { borrowValidation } = require("../validators/borrow.validator");
const { USER_ROLES } = require("../config/constants");


const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize(USER_ROLES.BORROWER),
  borrowValidation,
  borrowController.borrowBook,
);

router.put(
  "/return/:id",
  authenticate,
  authorize(USER_ROLES.BORROWER),
  borrowController.returnBook,
);

router.get(
  "/borrowed",
  authenticate,
  authorize(USER_ROLES.BORROWER),
  borrowController.getBorrowedBooks,
);

module.exports = router;