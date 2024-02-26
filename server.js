const mongoose = require("mongoose");
const app = require("./app");
const dbConnection = require("./config/dbConnection");
const logger = require("./src/utils/errorHandlings/logger");

const port = process.env.PORT || 3000; // Set default port if PORT environment variable is not provided

// Connect to the database first
dbConnection().then(() => {
    // Start the server only after the database connection is established
    const server = app.listen(port, () => {
        logger.info(`Server running on port ${port}`);

        // Log important information or instructions
        logger.info("Press Ctrl+C to gracefully shut down the server.");
    });

    // Handle graceful shutdown on SIGINT and SIGTERM signals
    const handleShutdown = async () => {
        logger.info("Server shutting down...");

        try {
            await mongoose.connection.close();
            logger.info("Database connection closed successfully.");
        } catch (err) {
            logger.error("Error closing the database connection:", err);
        }

        server.close((err) => {
            if (err) {
                logger.error("Error closing the server:", err);
                process.exit(1); // Exit with error code
            }

            logger.info("Server shut down gracefully.");
            process.exit(0); // Exit with success code
        });
    };

    // Listen for SIGINT and SIGTERM signals to gracefully shut down the server
    process.on("SIGINT", handleShutdown);
    process.on("SIGTERM", handleShutdown);
}).catch((error) => {
    logger.error("Error connecting to the database:", error);
});
