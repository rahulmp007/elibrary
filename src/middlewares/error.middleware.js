const { HTTP_STATUS, MESSAGES } = require("../config/constants");
const { getLocalizedMessage } = require("../utils/localization");
const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  // Get user language from request
  const language = req.language || 'en';

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: getLocalizedMessage("VALIDATION_ERROR", language),
      errors,
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    return res.status(HTTP_STATUS.CONFLICT).json({
      success: false,
      message: getLocalizedMessage("DUPLICATE_ENTRY", language) || message,
    });
  }

  // JWT error
  if (err.name === "JsonWebTokenError") {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: getLocalizedMessage("INVALID_TOKEN", language),
    });
  }

  // Mongoose cast error
  if (err.name === "CastError") {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: getLocalizedMessage("INVALID_ID", language) || "Invalid ID format",
    });
  }

  // ✅ SMART FIX: Handle service errors that use MESSAGES directly
  if (err.message && typeof err.message === 'string') {
    // Check if error message matches any of our English messages
    const englishMessages = MESSAGES.en;
    const messageKey = Object.keys(englishMessages).find(key => 
      englishMessages[key] === err.message
    );
    
    if (messageKey) {
      // Found matching message key, use localized version
      const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({
        success: false,
        message: getLocalizedMessage(messageKey, language),
      });
    }
  }

  // Custom service errors with messageKey (for future use)
  if (err.messageKey) {
    const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    return res.status(statusCode).json({
      success: false,
      message: getLocalizedMessage(err.messageKey, language),
    });
  }

  // Default error
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = getLocalizedMessage("SERVER_ERROR", language);
  
  res.status(statusCode).json({
    success: false,
    message,
  });
};

const notFoundHandler = (req, res) => {
  const language = req.language || 'en';
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: getLocalizedMessage("NOT_FOUND", language) || `Route ${req.originalUrl} not found`,
  });
};

module.exports = { errorHandler, notFoundHandler };