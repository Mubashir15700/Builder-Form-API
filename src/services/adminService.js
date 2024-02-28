class AdminService {
    constructor(userRepository, formRepository, submissionRepository) {
        this.userRepository = userRepository;
        this.formRepository = formRepository;
        this.submissionRepository = submissionRepository;
    };

    async getUsers() {
        try {
            const users = await this.userRepository.getAllUsers();
            return {
                status: 200,
                message: "Fetched users successfully",
                data: {
                    users
                }
            };
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

module.exports = AdminService;
