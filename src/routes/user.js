const express = require("express");
const { authChecker } = require("../middlewares/authChecker");

const router = express.Router();

const UserController = require("../controllers/user");
const FormRepository = require("../repositories/form");
const UserRepository = require("../repositories/user");
const UserService = require("../services/user");

const formRepository = new FormRepository();
const userRepository = new UserRepository();
const userService = new UserService(userRepository, formRepository);
const userController = new UserController(userService);

router.post("/create-form", authChecker, userController.createForm.bind(userController));

module.exports = router;
