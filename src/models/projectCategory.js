const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const ProjectCategory = sequelize.define(
    "project_category",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: DataTypes.STRING,
    },
    {
        tableName: "project_categories",
        timestamps: true,
        paranoid: true,
        underscored: true,
    }
);

module.exports = ProjectCategory;
