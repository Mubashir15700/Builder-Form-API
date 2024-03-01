class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    };

    async getUsers(req, res) {
        // Call the checkAuth method of the AuthService instance
        const response = await this.adminService.getUsers();

        // Send a success response
        res.status(200).json({
            status: 200,
            message: "Fetched users successfully",
            usersData: response.data.users
        });
    };

    async getForms(req, res) {
        let creatorId;
        if (req.query.userId !== "null") {
            creatorId = req.query.userId;
        } else {
            creatorId = req.user.userId;
        }

        // Call the userService to gte forms
        const forms = await this.adminService.getForms(creatorId);

        res.status(200).json({
            status: 200,
            message: "Fetched forms successfully",
            forms
        });
    };

    async getSubmission(req, res) {
        const formId = req.params.id;

        const result = await this.adminService.getSubmission(formId);

        // Send a success response
        res.status(200).json({
            status: result.status,
            message: result.message,
            submissions: result.data.submissions
        });
    };
};

module.exports = AdminController;
