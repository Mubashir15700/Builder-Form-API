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

    async getAllUsers() {
        return await User.find({ role: "user" }).select("-password");
    };

    async updateCreatedFormCount(id) {
        return await User.findByIdAndUpdate(id, {
            $inc: { formsCreated: 1 }
        }, { new: true }); // Set { new: true } to return the updated document
    };
};

module.exports = UserRepository;
