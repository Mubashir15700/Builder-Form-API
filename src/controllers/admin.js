class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    };

    async getUsers(req, res) {
        try {
            // Call the checkAuth method of the AuthService instance
            const response = await this.adminService.getUsers();

            // Send a success response
            res.status(200).json({
                status: 200,
                message: "Fetched users successfully",
                usersData: response.data.users
            });
        } catch (error) {
            res.status(401).json({ status: "failed", error: error.message });
        }
    };
};

module.exports = AdminController;
