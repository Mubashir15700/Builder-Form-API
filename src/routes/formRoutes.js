const express = require("express");

const router = express.Router();

const FormController = require("../controllers/formController");
const FormRepository = require("../repositories/formRepository");
const FormService = require("../services/formService");
const SubmissionRepository = require("../repositories/submissionRepository");
const catchAsync = require("../utils/errorHandlings/catchAsync"); // Import catchAsync middleware

const formRepository = new FormRepository();
const submissionRepository = new SubmissionRepository();

const formService = new FormService(formRepository, submissionRepository);
const formController = new FormController(formService);

router.get("/:id", catchAsync(formController.getForm.bind(formController)));
router.post("/:id/submit", catchAsync(formController.submitForm.bind(formController)));

module.exports = router;
