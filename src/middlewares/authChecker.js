const AuthService = require("../services/auth");

const authService = new AuthService();

exports.authChecker = async (req, res, next) => {
    let token;

    if (req.baseUrl === "/admin") {
        token = req.cookies.adminJwt;
    } else {
        token = req.cookies.userJwt;
    }

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
