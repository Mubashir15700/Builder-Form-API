const express = require("express");
const { authChecker } = require("../middlewares/authChecker");

const router = express.Router();

const AdminController = require("../controllers/adminController");
const UserRepository = require("../repositories/userRepository");
const AdminService = require("../services/adminService");

const userRepository = new UserRepository();
const adminService = new AdminService(userRepository);
const adminController = new AdminController(adminService);

router.get("/users", authChecker, adminController.getUsers.bind(adminController));

module.exports = router;
