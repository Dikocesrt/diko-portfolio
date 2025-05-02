const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const ExperienceCategory = sequelize.define(
    "experience_category",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: DataTypes.STRING,
    },
    {
        tableName: "experience_categories",
        timestamps: true,
        paranoid: true,
        underscored: true,
    }
);

module.exports = ExperienceCategory;
