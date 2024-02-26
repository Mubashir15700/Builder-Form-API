class FormController {
    constructor(formService) {
        this.formService = formService;
    };

    async getForm(req, res) {
        try {
            const { id } = req.params;

            const result = await this.formService.getForm(id);

            // Send a success response
            res.status(200).json({
                status: result.status,
                message: result.message,
                formData: result.data
            });
        } catch (error) {
            res.status(401).json({ status: "failed", error: error.message });
        }
    };

    async submitForm(req, res) {
        try {
            const formId = req.params.id;
            const formData = req.body;

            const result = await this.formService.submitForm(formId, formData);

            // Send a success response
            res.status(200).json({
                status: result.status,
                message: result.message,
            });
        } catch (error) {
            res.status(401).json({ status: "failed", error: error.message });
        }
    };
};

module.exports = FormController;
