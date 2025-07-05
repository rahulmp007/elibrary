const { body } = require("express-validator");
const { handleValidationErrors } = require("../middlewares/validation.middleware");
const config = require("../config");

const borrowValidation = [
  body("bookId")
    .notEmpty()
    .withMessage("Book ID is required")
    .isMongoId()
    .withMessage("Book ID must be valid"),

  body("days")
    .isInt({ min: 1, max: config.MAX_BORROW_DAYS })
    .withMessage(`Days must be between 1 and ${config.MAX_BORROW_DAYS}`),

  handleValidationErrors,
];

module.exports = {
  borrowValidation,
};




