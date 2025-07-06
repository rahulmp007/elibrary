
const { body } = require("express-validator");
const { handleValidationErrors } = require("../middlewares/validation.middleware"); // FIXED
const { USER_ROLES } = require("../config/constants");
const config = require('../config/index');

const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters")
    .trim(),

  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage("Email cannot exceed 255 characters"),

  body("password")
    .isLength({ min: config.PASSWORD_MIN_LENGTH })
    .withMessage(`Password must be at least ${config.PASSWORD_MIN_LENGTH} characters`)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)")
    .not()
    .isIn(['password', '12345678', 'password123', 'admin123'])
    .withMessage("Password cannot be a common weak password"),

  body("role")
    .isIn(Object.values(USER_ROLES))
    .withMessage(
      `Role must be one of: ${Object.values(USER_ROLES).join(", ")}`,
    ),

  body("phone")
    .optional()
    .matches(/^\+?[\d\s-()]+$/)
    .withMessage("Please enter a valid phone number")
    .isLength({ max: 20 })
    .withMessage("Phone number cannot exceed 20 characters"),

  body("address")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Address cannot exceed 500 characters"),

  handleValidationErrors,
];

const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage("Email too long"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 1, max: 128 })
    .withMessage("Invalid password length"),

  handleValidationErrors,
];

module.exports = {
  registerValidation,
  loginValidation,
}