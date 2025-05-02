const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Documentation = sequelize.define(
    "documentation",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        image: DataTypes.STRING,
        projectId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: "project_id",
        },
    },
    {
        tableName: "documentations",
        timestamps: true,
        paranoid: true,
        underscored: true,
    }
);

module.exports = Documentation;
