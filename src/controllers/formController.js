class FormController {
    constructor(formService) {
        this.formService = formService;
    };

    async getForm(req, res) {
        const { id } = req.params;

        const result = await this.formService.getForm(id);

        // Send a success response
        res.status(200).json({
            status: result.status,
            message: result.message,
            formData: result.data
        });
    };

    async submitForm(req, res) {
        const formId = req.params.id;
        const formData = req.body;

        const result = await this.formService.submitForm(formId, formData);

        // Send a success response
        res.status(200).json({
            status: result.status,
            message: result.message,
        });
    };
};

module.exports = FormController;
