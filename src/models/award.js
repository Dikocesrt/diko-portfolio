const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Award = sequelize.define(
    "award",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: DataTypes.STRING,
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        year: DataTypes.INTEGER,
        experienceId: {
            type: DataTypes.UUID,
            field: "experience_id",
        },
    },
    {
        tableName: "awards",
        timestamps: true,
        paranoid: true,
        underscored: true,
    }
);

module.exports = Award;
