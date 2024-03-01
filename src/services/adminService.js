class AdminService {
    constructor(userRepository, formRepository, submissionRepository) {
        this.userRepository = userRepository;
        this.formRepository = formRepository;
        this.submissionRepository = submissionRepository;
    };

    async getUsers() {
        const users = await this.userRepository.getAllUsers();
        return {
            status: 200,
            message: "Fetched users successfully",
            data: {
                users
            }
        };
    };

    async getForms(creatorId) {
        const savedForms = await this.formRepository.getForms(creatorId);

        return savedForms;
    };

    async getSubmission(formId) {
        const submissions = await this.submissionRepository.getSubmissions(formId);

        return {
            status: 200,
            message: "Fetched submissions successfully",
            data: {
                submissions,
            }
        };
    };
};

module.exports = AdminService;
