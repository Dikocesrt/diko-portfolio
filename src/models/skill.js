const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Skill = sequelize.define(
    "skill",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        color: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        category: DataTypes.ENUM("softskill", "hardskill", "softwareskill"),
        isStar: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            field: "is_star",
        },
    },
    {
        tableName: "skills",
        timestamps: true,
        paranoid: true,
        underscored: true,
    }
);

module.exports = Skill;
