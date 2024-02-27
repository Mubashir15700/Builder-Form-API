class FormService {
    constructor(formRepository, submissionRepository) {
        this.formRepository = formRepository;
        this.submissionRepository = submissionRepository;
    };

    async getForm(id) {
        try {
            const form = await this.formRepository.getForm(id);
            if (!form) {
                throw new Error("Form not found");
            }

            return {
                status: 200,
                message: "found form successfully",
                data: {
                    form
                }
            };
        } catch (error) {
            throw error;
        }
    };

    async submitForm(id, data) {
        try {

            const submitForm = await this.submissionRepository.submitForm(id, data);

            if (!submitForm) {
                throw new Error("Error while storing your response");
            }

            return {
                status: 200,
                message: "Form submitted successfully",
            };
        } catch (error) {
            throw error;
        }
    };
};

module.exports = FormService;
