class AdminService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    };

    async getUsers() {
        try {
            const users = await this.userRepository.getAllUsers();
            return {
                status: 200,
                message: "Fetched users successfully",
                data: {
                    users
                }
            };
        } catch (error) {
            throw error;
        }
    };
};

module.exports = AdminService;
