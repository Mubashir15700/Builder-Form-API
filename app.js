require("dotenv").config({ path: __dirname + "/.env" });
// const path = require("path");
const checkEnvVariables = require("./src/utils/checkEnvVariables");
const logger = require("./src/utils/errorHandlings/logger");

// Check for required environment variables
const requiredEnvVariables = [
    "PORT",
    "DB_URL",
    "CORS_ORIGIN",
    "JWT_SECRET_KEY",
];

checkEnvVariables(requiredEnvVariables);

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Routes
const authRoutes = require("./src/routes/authRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const userRoutes = require("./src/routes/userRoutes");
const formRoutes = require("./src/routes/formRoutes");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Configure CORS to allow requests from your frontend domain
app.use(cors({
    origin: "https://form-builder-six-pi.vercel.app",
    methods: ["GET", "POST"], // You can specify the allowed HTTP methods
}));

app.use((err, req, res, next) => {
    logger.error("Global error middleware: ", err.stack);
    res.status(500).json({
        status: "failed",
        message: "Something went wrong!"
    });
});

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/forms", formRoutes);

// Serve static files for the React page
// app.use(express.static(path.join(__dirname, "../client", "dist")));

// // If a route doesn"t match any of the above, serve the React index.html
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
// });

module.exports = app;
