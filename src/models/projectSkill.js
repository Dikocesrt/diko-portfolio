const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const ProjectSkill = sequelize.define(
    "project_skill",
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
        projectId: {
            type: DataTypes.UUID,
            field: "project_id",
        },
    },
    {
        tableName: "project_skills",
        timestamps: true,
        paranoid: true,
        underscored: true,
    }
);

module.exports = ProjectSkill;
