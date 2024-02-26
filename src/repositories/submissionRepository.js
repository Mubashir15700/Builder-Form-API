const Submission = require("../models/Submission");

class SubmissionRepository {
    async submitForm(formId, formData) {
        // Create a new Form document
        const newSubmission = new Submission({
            formId,
            formData,
        });

        // Save the document to the database
        return await newSubmission.save();
    };

    async getSubmissions(formId) {
        return await Submission.find({ formId });
    };

};

module.exports = SubmissionRepository;
