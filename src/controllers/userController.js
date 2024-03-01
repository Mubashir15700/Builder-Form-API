class UserController {
    constructor(userService) {
        this.userService = userService;
    };

    async createForm(req, res) {
        const creatorId = req.user.userId;
        const { formTitle, formDescription, formElements } = req.body;

        // Check if required fields are present
        if (!formTitle || !formDescription || !formElements) {
            throw new Error("Form title, description and elements are required");
        }

        // Call the userService to create the form
        await this.userService.createForm(
            creatorId, formTitle, formDescription, formElements
        );

        res.status(200).json({
            status: 200,
            message: "Form created successfully",
        });
    };

    async getForms(req, res) {
        const creatorId = req.user.userId;

        // Call the userService to gte forms
        const forms = await this.userService.getForms(creatorId);

        res.status(200).json({
            status: 200,
            message: "Fetched forms successfully",
            forms
        });
    };

    async getSubmission(req, res) {
        const formId = req.params.id;

        const result = await this.userService.getSubmission(formId);

        // Send a success response
        res.status(200).json({
            status: result.status,
            message: result.message,
            submissions: result.data.submissions
        });
    };

};

module.exports = UserController;
