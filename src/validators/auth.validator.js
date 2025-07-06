
const { body } = require("express-validator");
const { handleValidationErrors } = require("../middlewares/validation.middleware"); // FIXED
const { USER_ROLES } = require("../config/constants");

const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("role")
    .isIn(Object.values(USER_ROLES))
    .withMessage(
      `Role must be one of: ${Object.values(USER_ROLES).join(", ")}`,
    ),

  body("phone")
    .optional()
    .matches(/^\+?[\d\s-()]+$/)
    .withMessage("Please enter a valid phone number"),

  handleValidationErrors,
];

const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),

  handleValidationErrors,
];

module.exports = {
  registerValidation,
  loginValidation,
};

