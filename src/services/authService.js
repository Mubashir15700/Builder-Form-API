const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const hashPassword = require("../utils/hashPassword");

const TOKEN_EXPIRATION_DURATION = "7d";

class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    };

    async decodeToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    };

    async checkAuth(token) {
        if (!token) {
            throw new Error("Unauthorized user");
        }

        const decoded = await this.decodeToken(token);

        let currentUser = await this.userRepository.findUserByIdOne(decoded.userId);

        if (!currentUser) {
            throw new Error("User not found");
        }

        return {
            status: 200,
            message: `${decoded.role} Authorized`,
            data: {
                currentUser,
                role: decoded.role,
            },
        };
    };

    async login(username, password) {
        const currentUser = await this.userRepository.findUserByUsername(username);

        if (!currentUser) {
            throw new Error("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, currentUser.password);

        if (isMatch) {
            // Generate JWT Token
            const token = jwt.sign(
                { userId: currentUser._id, role: currentUser.role },
                process.env.JWT_SECRET_KEY,
                { expiresIn: TOKEN_EXPIRATION_DURATION }
            );

            // Omitting passowrd from the "currentUser" object
            const userDataWithoutPassword = { ...currentUser._doc, password: undefined };

            return {
                status: 200,
                message: "Logged in successfully",
                data: {
                    token,
                    currentUser: userDataWithoutPassword,
                }
            };
        } else {
            throw new Error("Invalid username or password");
        }
    };

    async signUp(data) {
        const { username, email, password } = data;

        // Check if the username is already taken
        const existingUsername = await this.userRepository.findUserByUsername(
            username
        );
        if (existingUsername) {
            throw new Error("This username is already taken");
        }

        // Check if the email is already registered
        const existingEmail = await this.userRepository.findUserByEmail(email);
        if (existingEmail) {
            throw new Error("This email is already registered");
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create user in the repository
        const user = await this.userRepository.createUser({
            username, email, password: hashedPassword
        });

        // Generate JWT Token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: TOKEN_EXPIRATION_DURATION }
        );

        // Omitting passowrd from the "currentUser" object
        const userDataWithoutPassword = { ...user._doc, password: undefined };

        return {
            status: 200,
            message: "Registered user successfully",
            data: {
                token,
                currentUser: userDataWithoutPassword
            }
        };
    };
};

module.exports = AuthService;
