const express = require("express");
const router = express.Router();
const { showFront } = require("../controllers/front");
const { listProjects, detailProject } = require("../controllers/project");
const {
    listExperiences,
    detailExperience,
    devShowDetail,
} = require("../controllers/experience");

router.get("/", showFront);
router.get("/projects", listProjects);
router.get("/experiences", listExperiences);
router.get("/experiences/:id", detailExperience);
router.get("/projects/:id", detailProject);
router.get("/experiences/:id/projects", listProjects);
router.get("/project-types/:type/projects", listProjects);
router.get("/about", async (req, res) => {
    res.render("about");
});

module.exports = router;
