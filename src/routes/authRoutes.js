const express = require("express");

const router = express.Router();

const AuthController = require("../controllers/authController");
const UserRepository = require("../repositories/userRepository");
const AuthService = require("../services/authService");
const catchAsync = require("../utils/errorHandlings/catchAsync"); // Import catchAsync middleware

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.get("/checkauth", catchAsync(authController.checkAuth.bind(authController)));
router.post("/login", catchAsync(authController.login.bind(authController)));
router.post("/sign-up", catchAsync(authController.signUp.bind(authController)));
router.post("/logout", catchAsync(authController.logout.bind(authController)));

module.exports = router;
