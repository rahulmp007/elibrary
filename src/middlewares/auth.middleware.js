const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const config = require("../config");
const { HTTP_STATUS, MESSAGES } = require("../config/constants");
const { sendError } = require("../utils/response");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    console.log(authHeader);
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendError(res, HTTP_STATUS.UNAUTHORIZED, MESSAGES.TOKEN_REQUIRED);
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user || !user.isActive) {
      return sendError(res, HTTP_STATUS.UNAUTHORIZED, MESSAGES.INVALID_TOKEN);
    }

    req.user = user;
    next();
  } catch (error) {
    return sendError(res, HTTP_STATUS.UNAUTHORIZED, MESSAGES.INVALID_TOKEN);
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, HTTP_STATUS.UNAUTHORIZED, MESSAGES.UNAUTHORIZED);
    }

    if (!roles.includes(req.user.role)) {
      return sendError(res, HTTP_STATUS.FORBIDDEN, MESSAGES.FORBIDDEN);
    }

    next();
  };
};

module.exports = { authenticate, authorize };
