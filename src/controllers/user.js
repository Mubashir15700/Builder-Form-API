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
                message: "Form creation successful",
            });
        } catch (error) {
            res.status(401).json({ status: "failed", message: error.message });
        }
    };

};

module.exports = UserController;
