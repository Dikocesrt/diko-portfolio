const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const ExperienceSkill = sequelize.define(
    "experience_skill",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        skillId: {
            type: DataTypes.UUID,
            field: "skill_id",
        },
        experienceId: {
            type: DataTypes.UUID,
            field: "experience_id",
        },
    },
    {
        tableName: "experience_skills",
        timestamps: true,
        paranoid: true,
        underscored: true,
    }
);

module.exports = ExperienceSkill;
