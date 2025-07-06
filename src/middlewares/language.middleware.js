const { getLocalizedMessage } = require("../utils/localization");

const languageMiddleware = (req, res, next) => {
  let language = "en"; // default

  if (req.user && req.user.language) {
    language = req.user.language;
  } else if (req.headers["accept-language"]) {
    const acceptLang = req.headers["accept-language"].toLowerCase();
    if (acceptLang.includes("hi")) language = "hi";
  } else if (req.query.lang && ["en", "hi"].includes(req.query.lang)) {
    language = req.query.lang;
  }

  req.language = language;

  req.getMessage = (key) => getLocalizedMessage(key, language);
  res.sendLocalizedSuccess = (messageKey, data = null) => {
    const message = getLocalizedMessage(messageKey, language);
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  };

  res.sendLocalizedCreated = (messageKey, data = null) => {
    const message = getLocalizedMessage(messageKey, language);
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  };

  res.sendLocalizedError = (statusCode, messageKey, errors = null) => {
    const message = getLocalizedMessage(messageKey, language);
    const response = {
      success: false,
      message,
    };
    if (errors) response.errors = errors;
    return res.status(statusCode).json(response);
  };

  next();
};

module.exports = { languageMiddleware };
