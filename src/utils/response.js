const { HTTP_STATUS } = require("../config/constants");

class ApiResponse {
  constructor(statusCode, message, data = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = statusCode < 400;
    if (data) this.data = data;
  }
}

const sendResponse = (res, statusCode, message, data = null) => {
  const response = new ApiResponse(statusCode, message, data);
  return res.status(statusCode).json(response);
};

const sendSuccess = (res, message, data = null) => {
  return sendResponse(res, HTTP_STATUS.OK, message, data);
};

const sendCreated = (res, message, data = null) => {
  return sendResponse(res, HTTP_STATUS.CREATED, message, data);
};

const sendError = (res, statusCode, message) => {
  return sendResponse(res, statusCode, message);
};

module.exports = {
  ApiResponse,
  sendResponse,
  sendSuccess,
  sendCreated,
  sendError,
};
