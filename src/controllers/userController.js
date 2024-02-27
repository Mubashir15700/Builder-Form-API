class UserController {
    constructor(userService) {
        this.userService = userService;
    };

    async createForm(req, res) {
        try {
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
        } catch (error) {
            res.status(401).json({ status: "failed", message: error.message });
        }
    };

    async getForms(req, res) {
        try {
            let creatorId;
            if (req.query.userId !== "null") {
                creatorId = req.query.userId;
            } else {
                creatorId = req.user.userId;
            }

            // Call the userService to gte forms
            const forms = await this.userService.getForms(creatorId);

            res.status(200).json({
                status: 200,
                message: "Fetched forms successfully",
                forms
            });
        } catch (error) {
            res.status(401).json({ status: "failed", message: error.message });
        }
    };

    async getSubmission(req, res) {
        try {
            const formId = req.params.id;

            const result = await this.userService.getSubmission(formId);

            // Send a success response
            res.status(200).json({
                status: result.status,
                message: result.message,
                submissions: result.data.submissions
            });
        } catch (error) {
            res.status(401).json({ status: "failed", error: error.message });
        }
    };

};

module.exports = UserController;
