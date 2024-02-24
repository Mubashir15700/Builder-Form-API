const User = require("../models/User");

class UserRepository {
    async findUserByIdOne(id) {
        return await User.findById(id);
    };

    async findUserByUsername(username) {
        return await User.findOne({ username });
    };

    async findUserByEmail(email) {
        return await User.findOne({ email });
    };

    async createUser(userData) {
        const newUser = new User(userData);
        return await newUser.save();
    };
};

module.exports = UserRepository;
