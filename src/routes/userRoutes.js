const express = require("express");
const { authChecker } = require("../middlewares/authChecker");

const router = express.Router();

const UserController = require("../controllers/userController");
const FormRepository = require("../repositories/formRepository");
const SubmissionRepository = require("../repositories/submissionRepository");
const UserRepository = require("../repositories/userRepository");
const UserService = require("../services/userService");
const catchAsync = require("../utils/errorHandlings/catchAsync"); // Import catchAsync middleware

const formRepository = new FormRepository();
const userRepository = new UserRepository();
const submissionRepository = new SubmissionRepository();
const userService = new UserService(userRepository, formRepository, submissionRepository);
const userController = new UserController(userService);

router.post("/forms/create", authChecker, catchAsync(userController.createForm.bind(userController)));
router.get("/forms", authChecker, catchAsync(userController.getForms.bind(userController)));
router.get("/forms/:id/submissions", authChecker, catchAsync(userController.getSubmission.bind(userController)));

module.exports = router;
