const { Experience, Project, Skill } = require("../models/association");
const getURL = require("../helpers/getCloudinary");
const sequelize = require("../configs/database");

const showFront = async (req, res) => {
    try {
        const experiences = await Experience.findAll({
            where: {
                isStar: true,
            },
            order: sequelize.random(),
            limit: 3,
        });

        const plainExperiences = experiences.map((experience) =>
            experience.get({ plain: true })
        );

        plainExperiences.map((experience) => {
            if (experience.image) {
                experience.image = getURL(experience.image, 400, 200);
            }
        });

        const projects = await Project.findAll({
            where: {
                isStar: true,
            },
            order: sequelize.random(),
            limit: 3,
        });

        const plainProjects = projects.map((project) =>
            project.get({ plain: true })
        );

        plainProjects.map((project) => {
            if (project.image) {
                project.image = getURL(project.image, 400, 400);
            }
        });

        const skills = await Skill.findAll({
            order: sequelize.random(),
            limit: 14,
        });

        const plainSkills = skills.map((skill) => skill.get({ plain: true }));

        plainSkills.map((skill) => {
            if (skill.image) {
                skill.image = getURL(skill.image, 50, 50);
            }
        });

        res.render("front", {
            isFront: true,
            experiences: plainExperiences,
            projects: plainProjects,
            skills: plainSkills,
        });
    } catch (error) {
        console.log("SHOW FRONT ERROR ==> " + error);
    }
};

module.exports = {
    showFront,
};
