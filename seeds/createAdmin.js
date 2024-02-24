require("dotenv").config({ path: "../.env" });
const User = require("../src/models/User");
const dbConnection = require("../config/dbConnection");
const hashPassword = require("../src/utils/hashPassword");
const catchAsync = require("../src/utils/errorHandlings/catchAsync");

dbConnection();

const seedAdmin = catchAsync(async () => {
    const username = process.env.ADMINUSERNAME;
    const password = process.env.ADMINPASSWORD;

    // Check if there are any existing admins
    const existingAdmin = await User.findOne({ role: "admin" });

    if (!existingAdmin) {
        const hashedPassword = await hashPassword(password);

        // Create a new admin document
        const admin = new User({
            username,
            password: hashedPassword,
            role: "admin"
        });

        // Save the admin to the database
        await admin.save();
    } else {
        console.log("Admin already exists. Skipping seed.");
    }
});

seedAdmin();
