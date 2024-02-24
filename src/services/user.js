class UserService {
    constructor(userRepository, formRepository) {
        this.userRepository = userRepository;
        this.formRepository = formRepository;
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
                name: element.props.name
            }));

            const savedForm = await this.formRepository.createForm(
                creatorId, formTitle, formDescription, extractedFields
            );

            if (savedForm) {
                await this.userRepository.updateCreatedFormCount(creatorId);
            }

            return savedForm; // Optionally, you can return the saved form document
        } catch (error) {
            throw error;
        }

    };
};

module.exports = UserService;
