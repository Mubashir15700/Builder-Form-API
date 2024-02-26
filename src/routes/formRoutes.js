const express = require("express");

const router = express.Router();

const FormController = require("../controllers/formController");
const FormRepository = require("../repositories/formRepository");
const FormService = require("../services/formService");

const formRepository = new FormRepository();
const formService = new FormService(formRepository);
const formController = new FormController(formService);

router.get("/:id", formController.getForm.bind(formController));
router.post("/:id/submit", formController.submitForm.bind(formController));

module.exports = router;
