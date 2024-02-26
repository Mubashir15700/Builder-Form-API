class UserService {
    constructor(userRepository, formRepository, submissionRepository) {
        this.userRepository = userRepository;
        this.formRepository = formRepository;
        this.submissionRepository = submissionRepository;
    };

    async createForm(creatorId, formTitle, formDescription, formElements) {
        try {
            // Check if the form title is unique
            const formExists = await this.formRepository.isFormTitleUnique(creatorId, formTitle);

            if (formExists) {
                throw new Error("Form title must be unique");
            }

            const extractedFields = formElements.map(element => ({
                type: element.props.type,
                placeholder: element.props.placeholder,
                name: element.props.name,
                validations: element.props.validations
            }));

            const savedForm = await this.formRepository.createForm(
                creatorId, formTitle, formDescription, extractedFields
            );

            if (savedForm) {
                await this.userRepository.updateCreatedFormCount(creatorId);
            }

            return savedForm;
        } catch (error) {
            throw error;
        }

    };

    async getForms(creatorId) {
        try {
            const savedForms = await this.formRepository.getForms(creatorId);

            return savedForms;
        } catch (error) {
            throw error;
        }
    };

    async getSubmission(formId) {
        try {
            const submissions = await this.submissionRepository.getSubmissions(formId);

            return {
                status: 200,
                message: "Fetched submissions successfully",
                data: {
                    submissions,
                }
            };
        } catch (error) {
            throw error;
        }
    };
};

module.exports = UserService;
