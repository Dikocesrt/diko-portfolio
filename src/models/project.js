const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Project = sequelize.define(
    "project",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        description: DataTypes.TEXT,
        date: DataTypes.STRING,
        type: DataTypes.ENUM("website", "mobile", "api"),
        isStar: {
            type: DataTypes.BOOLEAN,
            field: "is_star",
            defaultValue: false,
        },
        githubLink: {
            type: DataTypes.STRING,
            field: "github_link",
            allowNull: true,
        },
        experienceId: {
            type: DataTypes.UUID,
            field: "experience_id",
            allowNull: true,
        },
        projectCategoryId: {
            type: DataTypes.UUID,
            field: "project_category_id",
            allowNull: false,
        },
    },
    {
        tableName: "projects",
        timestamps: true,
        paranoid: true,
        underscored: true,
    }
);

module.exports = Project;
