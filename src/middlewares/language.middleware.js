// middlewares/language.middleware.js
const { getLocalizedMessage } = require("../utils/localization");

/**
 * Middleware to detect user's preferred language and add localization support
 */
const languageMiddleware = (req, res, next) => {
  // Get language from multiple sources (priority order)
  let language = 'en'; // default

  // 1. From user profile (if authenticated)
  if (req.user && req.user.language) {
    language = req.user.language;
  }
  // 2. From Accept-Language header
  else if (req.headers['accept-language']) {
    const acceptLang = req.headers['accept-language'].toLowerCase();
    if (acceptLang.includes('hi')) language = 'hi';
  }
  // 3. From query parameter (for testing)
  else if (req.query.lang && ['en', 'hi'].includes(req.query.lang)) {
    language = req.query.lang;
  }

  // Store language in request
  req.language = language;

  // Add helper method to get localized messages
  req.getMessage = (key) => getLocalizedMessage(key, language);

  // Add helper to response for controllers
  res.sendLocalizedSuccess = (messageKey, data = null) => {
    const message = getLocalizedMessage(messageKey, language);
    return res.status(200).json({
      success: true,
      message,
      data
    });
  };

  res.sendLocalizedCreated = (messageKey, data = null) => {
    const message = getLocalizedMessage(messageKey, language);
    return res.status(201).json({
      success: true,
      message,
      data
    });
  };

  res.sendLocalizedError = (statusCode, messageKey, errors = null) => {
    const message = getLocalizedMessage(messageKey, language);
    const response = {
      success: false,
      message
    };
    if (errors) response.errors = errors;
    return res.status(statusCode).json(response);
  };

  next();
};

module.exports = { languageMiddleware };