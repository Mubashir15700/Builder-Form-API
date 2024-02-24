const mongoose = require("mongoose");

// Define the allowed roles using an enum
const validRoles = ["user", "admin"];

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        validate: {
            validator: function (value) {
                // Check if the email is required based on the user's role
                if (this.role === "user") {
                    return value && value.length > 0;
                }
                // If the role is admin, email is not required
                return true;
            },
            message: "Email is required!"
        }
    },
    role: {
        type: String,
        default: "user",
        enum: validRoles
    },
    formsCreated: {
        type: Number,
        default: 0 // Initialize formsCreated to 0
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User; 
