const mongoose = require("mongoose");

const formElementSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
    },
});

const formSchema = new mongoose.Schema({
    creatorId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    },
    formElements: [formElementSchema],
});

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
