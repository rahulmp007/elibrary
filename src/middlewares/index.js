const { authenticate, authorize } = require("./auth.middleware");
const { errorHandler, notFoundHandler } = require("./error.middleware");
const { upload } = require("./upload.middleware");
const { handleValidationErrors } = require("./validation.middleware");

module.exports = {
  authenticate,
  authorize,
  errorHandler,
  notFoundHandler,
  upload,
  handleValidationErrors,
};
