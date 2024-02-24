const express = require("express");

const AuthController = require("../controllers/auth");
const UserRepository = require("../repositories/user");
const AuthService = require("../services/auth");

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

const router = express.Router();

router.get("/checkauth", authController.checkAuth.bind(authController));
router.post("/login", authController.login.bind(authController));
router.post("/sign-up", authController.signUp.bind(authController));
router.post("/logout", authController.logout.bind(authController));

module.exports = router;
