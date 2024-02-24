const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
    formId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    formData: {
        type: Object,
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});

const Submission = mongoose.model("Submission", submissionSchema);
module.exports = Submission;
