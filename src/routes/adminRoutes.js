const express = require("express");
const { adminAuthChecker } = require("../middlewares/authChecker");

const router = express.Router();

const AdminController = require("../controllers/adminController");
const UserRepository = require("../repositories/userRepository");
const FormRepository = require("../repositories/formRepository");
const SubmissionRepostory = require("../repositories/submissionRepository");
const AdminService = require("../services/adminService");
const catchAsync = require("../utils/errorHandlings/catchAsync"); // Import catchAsync middleware

const userRepository = new UserRepository();
const formRepository = new FormRepository();
const submissionRepository = new SubmissionRepostory();
const adminService = new AdminService(userRepository, formRepository, submissionRepository);
const adminController = new AdminController(adminService);

router.get("/users", adminAuthChecker, catchAsync(adminController.getUsers.bind(adminController)));
router.get("/forms", adminAuthChecker, catchAsync(adminController.getForms.bind(adminController)));
router.get("/forms/:id/submissions", adminAuthChecker, catchAsync(adminController.getSubmission.bind(adminController)));

module.exports = router;
