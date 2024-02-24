const express = require("express");
const { authChecker } = require("../middlewares/authChecker");

const router = express.Router();

const AdminController = require("../controllers/admin");
const UserRepository = require("../repositories/user");
const AdminService = require("../services/admin");

const userRepository = new UserRepository();
const adminService = new AdminService(userRepository);
const adminController = new AdminController(adminService);

router.get("/users", authChecker, adminController.getUsers.bind(adminController));

module.exports = router;
