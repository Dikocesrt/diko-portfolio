const express = require("express");
const router = express.Router();
const { showFront } = require("../controllers/front");
const { showProject } = require("../controllers/project");
const { showExperience } = require("../controllers/experience");

router.get("/", showFront);
router.get("/projects", showProject);
router.get("/experiences", showExperience);

module.exports = router;
