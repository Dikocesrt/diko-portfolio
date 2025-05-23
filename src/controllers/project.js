const {
    Project,
    ProjectCategory,
    ProjectSkill,
    Experience,
    Documentation,
} = require("../models/association");
const getURL = require("../helpers/getCloudinary");
const sequelize = require("../configs/database");

const listProjects = async (req, res) => {
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
                project.image = getURL(project.image, 400, 400);
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

const detailProject = async (req, res) => {
    try {
        const project = await Project.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: ProjectCategory,
                    as: "category",
                    attributes: ["name"],
                },
                {
                    model: ProjectSkill,
                    as: "projectSkills",
                    include: [
                        {
                            model: Skill,
                            as: "skill", // sesuai dengan relasi ProjectSkill.belongsTo(Skill)
                        },
                    ],
                },
                {
                    model: Documentation,
                    as: "documentations",
                    attributes: ["image"],
                },
            ],
        });

        if (!project) {
            res.status(404).send("Project not found");
        }

        const plainProject = project.get({ plain: true });

        const hardskills = plainProject.projectSkills.filter(
            (item) => item.skill?.category === "hardskill"
        );
        const softskills = plainProject.projectSkills.filter(
            (item) => item.skill?.category === "softskill"
        );
        const softwareskills = plainProject.projectSkills.filter(
            (item) => item.skill?.category === "softwareskill"
        );

        plainProject.hardskills = hardskills.map((item) => item.skill);
        plainProject.softskills = softskills.map((item) => item.skill);
        plainProject.softwareskills = softwareskills.map((item) => item.skill);

        if (plainProject.image) {
            plainProject.largeImage = getURL(plainProject.image, 1300, 680);
            plainProject.smallImage = getURL(plainProject.image, 350, 180);
        }

        const documentations = plainProject.documentations.map((item) =>
            getURL(item.image, 615, 400)
        );
        plainProject.documentations = documentations;

        res.render("projects/detail", {
            project: plainProject,
        });
    } catch (error) {
        console.log("SHOW PROJECT ERROR => " + error);
    }
};

const devShowDetailProject = async (req, res) => {
    res.render("projects/detail");
};

module.exports = {
    listProjects,
    detailProject,
    devShowDetailProject,
};
