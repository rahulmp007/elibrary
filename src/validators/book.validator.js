const { body } = require("express-validator");
const { handleValidationErrors } = require("../middlewares/validation.middleware");


const bookValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 300 })
    .withMessage("Title cannot exceed 300 characters"),

  body("library")
    .notEmpty()
    .withMessage("Library is required")
    .isMongoId()
    .withMessage("Library must be a valid ID"),

  body("isbn")
    .optional()
    .matches(/^(?:\d{9}[\dX]|\d{13})$/)
    .withMessage("Please enter a valid ISBN"),

  body("genre")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Genre cannot exceed 100 characters"),

  body("description")
    .optional()
    .isLength({ max: 2000 })
    .withMessage("Description cannot exceed 2000 characters"),

  body("publishedYear")
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage("Published year must be valid"),

  body("pages")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Pages must be positive"),

  body("borrowingCharge")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Borrowing charge cannot be negative"),

  handleValidationErrors,
];

const updateBookValidation = [
  body("title")
    .optional()
    .isLength({ min: 1, max: 300 })
    .withMessage("Title must be between 1 and 300 characters"),

  body("library")
    .optional()
    .isMongoId()
    .withMessage("Library must be a valid ID"),

  body("isbn")
    .optional()
    .matches(/^(?:\d{9}[\dX]|\d{13})$/)
    .withMessage("Please enter a valid ISBN"),

  body("genre")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Genre cannot exceed 100 characters"),

  body("description")
    .optional()
    .isLength({ max: 2000 })
    .withMessage("Description cannot exceed 2000 characters"),

  body("publishedYear")
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage("Published year must be valid"),

  body("pages")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Pages must be positive"),

  body("borrowingCharge")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Borrowing charge cannot be negative"),

  handleValidationErrors,
];

module.exports = {
  bookValidation,
  updateBookValidation,
};
