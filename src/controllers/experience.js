const { Experience } = require("../models/association");
const getURL = require("../helpers/getCloudinary");
const sequelize = require("../configs/database");

const showExperiences = async (req, res) => {
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
            isExperience: true,
            experiences: plainExperiences,
        });
    } catch (error) {
        console.log("SHOW LIST ERROR => " + error);
    }
};

module.exports = {
    showExperiences,
};
