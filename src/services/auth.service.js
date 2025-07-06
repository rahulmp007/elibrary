const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const config = require("../config");
const { HTTP_STATUS } = require("../config/constants");

class AuthService {
  async register(userData) {
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      const error = new Error("DUPLICATE_EMAIL");  
      error.statusCode = HTTP_STATUS.CONFLICT;
      error.messageKey = "USER_ALREADY_EXISTS"; 
      throw error;
    }

    const user = new User(userData);
    await user.save();

    const token = this.generateToken(user._id);

    return { user, token };
  }

  async login(email, password) {
    const user = await User.findOne({ email, isActive: true }).select(
      "+password",
    );

    if (!user || !(await user.comparePassword(password))) {
      const error = new Error("INVALID_LOGIN");  
      error.statusCode = HTTP_STATUS.UNAUTHORIZED;
      error.messageKey = "INVALID_CREDENTIALS"; 
      throw error;
    }

    user.lastLogin = new Date();
    await user.save();

    const token = this.generateToken(user._id);

    user.password = undefined;

    return { user, token };
  }

  generateToken(userId) {
    return jwt.sign({ userId }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN,
    });
  }
}

module.exports = new AuthService();