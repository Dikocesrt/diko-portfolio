const express = require("express");
const router = express.Router();
const { showFront } = require("../controllers/front");
const { showProjects } = require("../controllers/project");
const { showExperiences } = require("../controllers/experience");

router.get("/", showFront);
router.get("/projects", showProjects);
router.get("/experiences", showExperiences);

module.exports = router;
