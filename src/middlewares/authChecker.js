const AuthService = require("../services/authService");

const authService = new AuthService();

exports.userAuthChecker = async (req, res, next) => {
    const token = req.cookies.userJwt;

    if (!token) {
        return res.status(401).json({
            status: "failed", message: "Unauthorized - Missing JWT"
        });
    }

    try {
        // Call the checkAuth method of the AuthService instance to decode and verify the token
        const authResult = await authService.decodeToken(token);

        // If authentication is successful, attach user information to the request object
        req.user = authResult;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ status: "failed", message: "Unauthorized - Invalid JWT" });
    }
};

exports.adminAuthChecker = async (req, res, next) => {
    const token = req.cookies.adminJwt;

    if (!token) {
        return res.status(401).json({
            status: "failed", message: "Unauthorized - Missing JWT"
        });
    }

    try {
        // Call the checkAuth method of the AuthService instance to decode and verify the token
        const authResult = await authService.decodeToken(token);

        // If authentication is successful, attach user information to the request object
        req.user = authResult;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ status: "failed", message: "Unauthorized - Invalid JWT" });
    }
};
