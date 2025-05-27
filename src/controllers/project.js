const {
    Project,
    ProjectCategory,
    ProjectSkill,
    Experience,
    Documentation,
    Skill,
} = require("../models/association");
const getURL = require("../helpers/getCloudinary");
const sequelize = require("../configs/database");

const listProjects = async (req, res) => {
    try {
        let type;
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
        } else if (req.params.type) {
            projects = await Project.findAll({
                order: [["created_at", "ASC"]],
                where: {
                    type: req.params.type,
                },
                include: [
                    {
                        model: ProjectCategory,
                        as: "category",
                        attributes: ["name"],
                    },
                ],
            });

            type = req.params.type;
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
                project.image = getURL(project.image, 400, 230);
            }
        });

        res.render("projects/list", {
            projects: plainProjects,
            isProjects,
            experience,
            type,
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

        if (plainProject.image) {
            plainProject.image = getURL(plainProject.image, 1300, 680);
        }

        const hardskills = plainProject.projectSkills
            .filter((item) => item.skill?.category === "hardskill")
            .slice(0, 10);
        const softskills = plainProject.projectSkills
            .filter((item) => item.skill?.category === "softskill")
            .slice(0, 7);
        const softwareskills = plainProject.projectSkills
            .filter((item) => item.skill?.category === "softwareskill")
            .slice(0, 7);

        plainProject.hardskills = hardskills.map((item) => item.skill);
        plainProject.softskills = softskills.map((item) => item.skill);
        plainProject.softwareskills = softwareskills.map((item) => item.skill);

        plainProject.hardskills.forEach((hardskill) => {
            if (hardskill.image) {
                hardskill.image = getURL(hardskill.image, 50, 50);
            }
        });

        plainProject.softskills.forEach((softskill) => {
            if (softskill.image) {
                softskill.image = getURL(softskill.image, 50, 50);
            }
        });

        plainProject.softwareskills.forEach((softwareskill) => {
            if (softwareskill.image) {
                softwareskill.image = getURL(softwareskill.image, 50, 50);
            }
        });

        const skillLength =
            plainProject.hardskills.length +
            plainProject.softskills.length +
            plainProject.softwareskills.length;

        if (skillLength > 0) {
            plainProject.hasSkills = true;
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

module.exports = {
    listProjects,
    detailProject,
};
