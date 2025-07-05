const authService = require("../services/auth.service");
const { MESSAGES } = require("../config/constants");

class AuthController {
  async register(req, res, next) {
    try {
      const { user, token } = await authService.register(req.body);

      res.sendLocalizedCreated("USER_CREATED", { user, token });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.login(email, password);

      res.sendLocalizedSuccess("LOGIN_SUCCESS", { user, token });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res) {
    res.sendLocalizedSuccess("PROFILE_RETRIEVED", { user: req.user });
  }
}

module.exports = new AuthController();