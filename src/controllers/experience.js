const {
    Experience,
    ExperienceCategory,
    ExperienceSkill,
    Skill,
    Project,
    Award,
    ProjectCategory,
} = require("../models/association");
const getURL = require("../helpers/getCloudinary");
const sequelize = require("../configs/database");

const listExperiences = async (req, res) => {
    try {
        const experiences = await Experience.findAll({
            order: [["created_at", "ASC"]],
            include: [
                {
                    model: ExperienceCategory,
                    as: "category",
                    attributes: ["name"],
                },
            ],
        });

        const plainExperiences = experiences.map((experience) =>
            experience.get({ plain: true })
        );

        plainExperiences.map((experience) => {
            if (experience.image) {
                experience.image = getURL(experience.image, 400, 200);
            }
        });

        res.render("experiences/list", {
            isExperiences: true,
            experiences: plainExperiences,
        });
    } catch (error) {
        console.log("SHOW LIST ERROR => " + error);
    }
};

const detailExperience = async (req, res) => {
    try {
        const experience = await Experience.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: ExperienceCategory,
                    as: "category",
                    attributes: ["name"],
                },
                {
                    model: ExperienceSkill,
                    as: "experienceSkills",
                    include: [
                        {
                            model: Skill,
                            as: "skill", // sesuai dengan relasi ExperienceSkill.belongsTo(Skill)
                        },
                    ],
                },
                {
                    model: Project,
                    as: "projects",
                    attributes: ["id", "name", "image"],
                    limit: 3,
                    include: [
                        {
                            model: ProjectCategory,
                            as: "category",
                            attributes: ["name"],
                        },
                    ],
                },
                {
                    model: Award,
                    as: "awards",
                    attributes: ["id", "name", "year", "description"],
                },
            ],
        });

        if (!experience) {
            return res.status(404).send("Experience not found");
        }

        const plainExperience = experience.get({ plain: true });

        const hardskills = plainExperience.experienceSkills
            .filter((item) => item.skill?.category === "hardskill")
            .slice(0, 10);
        const softskills = plainExperience.experienceSkills
            .filter((item) => item.skill?.category === "softskill")
            .slice(0, 8);
        const softwareskills = plainExperience.experienceSkills
            .filter((item) => item.skill?.category === "softwareskill")
            .slice(0, 8);

        plainExperience.hardskills = hardskills.map((item) => item.skill);
        plainExperience.softskills = softskills.map((item) => item.skill);
        plainExperience.softwareskills = softwareskills.map(
            (item) => item.skill
        );

        if (plainExperience.image) {
            plainExperience.largeImage = getURL(
                plainExperience.image,
                1300,
                680
            );
            plainExperience.smallImage = getURL(
                plainExperience.image,
                350,
                180
            );
        }

        plainExperience.projects.forEach((project) => {
            if (project.image) {
                project.image = getURL(project.image, 400, 230);
            }
        });

        plainExperience.hardskills.forEach((hardskill) => {
            if (hardskill.image) {
                hardskill.image = getURL(hardskill.image, 50, 50);
            }
        });

        plainExperience.softskills.forEach((softskill) => {
            if (softskill.image) {
                softskill.image = getURL(softskill.image, 50, 50);
            }
        });

        plainExperience.softwareskills.forEach((softwareskill) => {
            if (softwareskill.image) {
                softwareskill.image = getURL(softwareskill.image, 50, 50);
            }
        });

        const skillLength =
            plainExperience.hardskills.length +
            plainExperience.softskills.length +
            plainExperience.softwareskills.length;

        if (skillLength > 0) {
            plainExperience.hasSkills = true;
        }

        res.render("experiences/detail", {
            experience: plainExperience,
        });
    } catch (error) {
        console.error("SHOW DETAIL ERROR =>", error);
        res.status(500).send("Internal Server Error");
    }
};

const devShowDetail = async (req, res) => {
    res.render("experiences/detail");
};

module.exports = {
    listExperiences,
    detailExperience,
};
