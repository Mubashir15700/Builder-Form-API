const Yup = require("yup");

const userValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required("Username is required"),
    password: Yup.string()
        .required("Password is required")
});

module.exports = userValidationSchema;
