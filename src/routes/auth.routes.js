const express = require("express");
const authController = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { handleValidationErrors } = require("../middlewares/validation.middleware");
const { registerValidation, loginValidation } = require("../validators/auth.validator");


const router = express.Router();

router.post("/register", registerValidation, authController.register);
router.post("/login", loginValidation, authController.login);
router.get("/profile", authenticate, authController.getProfile);

module.exports = router;
