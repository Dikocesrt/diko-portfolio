const {
    Project,
    ProjectCategory,
    Experience,
} = require("../models/association");
const getURL = require("../helpers/getCloudinary");
const sequelize = require("../configs/database");

const showProjects = async (req, res) => {
    try {
        let projects, isProjects, experience;

        if (req.params.id) {
            experience = await Experience.findOne({
                where: {
                    id: req.params.id,
                },
            });

            projects = await Project.findAll({
                order: [["created_at", "ASC"]],
                where: {
                    experienceId: req.params.id,
                },
                include: [
                    {
                        model: ProjectCategory,
                        as: "category",
                        attributes: ["name"],
                    },
                ],
            });

            isProjects = false;
        } else {
            projects = await Project.findAll({
                order: [["created_at", "ASC"]],
                include: [
                    {
                        model: ProjectCategory,
                        as: "category",
                        attributes: ["name"],
                    },
                ],
            });

            isProjects = true;
        }

        const plainProjects = projects.map((project) =>
            project.get({ plain: true })
        );

        plainProjects.map((project) => {
            if (project.image) {
                project.image = getURL(project.image, 400, 200);
            }
        });

        res.render("projects/list", {
            projects: plainProjects,
            isProjects,
            experience,
        });
    } catch (error) {
        console.log("SHOW PROJECTS ERROR => " + error);
    }
};

module.exports = {
    showProjects,
};
