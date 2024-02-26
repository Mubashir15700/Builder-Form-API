// checkEnvVariables.js
const logger = require("../utils/errorHandlings/logger");

const checkEnvVariables = (requiredEnvVariables) => {
    const missingVariables = requiredEnvVariables.filter(variable => !process.env[variable]);

    if (missingVariables.length > 0) {
        logger.error(`Missing environment variables: ${missingVariables.join(', ')}`);
        process.exit(1);
    }
};

module.exports = checkEnvVariables;
