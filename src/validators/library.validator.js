const { body } = require("express-validator");
const { handleValidationErrors } = require("../middlewares/validation.middleware");

const libraryValidation = [
  body("name")
    .notEmpty()
    .withMessage("Library name is required")
    .isLength({ max: 200 })
    .withMessage("Name cannot exceed 200 characters"),

  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ max: 500 })
    .withMessage("Address cannot exceed 500 characters"),

  body("phone")
    .optional()
    .matches(/^\+?[\d\s-()]+$/)
    .withMessage("Please enter a valid phone number"),

  body("email").optional().isEmail().withMessage("Please enter a valid email"),

  body("description")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),

  handleValidationErrors,
];

const addBookToLibraryValidation = [
  body("bookId")
    .notEmpty()
    .withMessage("Book ID is required")
    .isMongoId()
    .withMessage("Book ID must be valid"),

  handleValidationErrors,
];

module.exports = {
  libraryValidation,
  addBookToLibraryValidation,
};


