const {
    Experience,
    ExperienceCategory,
    ExperienceSkill,
    Skill,
    Project,
    Award,
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
                    attributes: ["id", "name"],
                },
                {
                    model: Award,
                    as: "awards",
                    attributes: ["id", "name"],
                },
            ],
        });

        if (!experience) {
            return res.status(404).send("Experience not found");
        }

        const plainExperience = experience.get({ plain: true });

        const hardskills = plainExperience.experienceSkills.filter(
            (item) => item.skill?.category === "hardskill"
        );
        const softskills = plainExperience.experienceSkills.filter(
            (item) => item.skill?.category === "softskill"
        );
        const softwareskills = plainExperience.experienceSkills.filter(
            (item) => item.skill?.category === "softwareskill"
        );

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
    devShowDetail,
    detailExperience,
};
