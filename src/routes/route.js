const express = require("express");
const router = express.Router();
const { showFront } = require("../controllers/front");
const { listProjects } = require("../controllers/project");
const {
    listExperiences,
    detailExperience,
    devShowDetail,
} = require("../controllers/experience");

router.get("/", showFront);
router.get("/projects", listProjects);
router.get("/experiences", listExperiences);
router.get("/experiences/:id", devShowDetail);

module.exports = router;
