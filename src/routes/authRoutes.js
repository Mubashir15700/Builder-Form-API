const express = require("express");

const router = express.Router();

const AuthController = require("../controllers/authController");
const UserRepository = require("../repositories/userRepository");
const AuthService = require("../services/authService");

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.get("/checkauth", authController.checkAuth.bind(authController));
router.post("/login", authController.login.bind(authController));
router.post("/sign-up", authController.signUp.bind(authController));
router.post("/logout", authController.logout.bind(authController));

module.exports = router;
