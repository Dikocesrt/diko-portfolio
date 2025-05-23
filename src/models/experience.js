const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Experience = sequelize.define(
    "experience",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: DataTypes.STRING,
        image: DataTypes.STRING,
        company: DataTypes.STRING,
        location: DataTypes.STRING,
        locationType: {
            type: DataTypes.ENUM("onsite", "hybrid", "remote"),
            field: "location_type",
        },
        monthStart: {
            type: DataTypes.STRING,
            field: "month_start",
        },
        monthEnd: {
            type: DataTypes.STRING,
            field: "month_end",
        },
        yearStart: {
            type: DataTypes.INTEGER,
            field: "year_start",
        },
        yearEnd: {
            type: DataTypes.INTEGER,
            field: "year_end",
        },
        description: DataTypes.TEXT,
        position: DataTypes.STRING,
        employmentType: {
            type: DataTypes.ENUM(
                "fulltime",
                "parttime",
                "selfemployed",
                "contract",
                "internship",
                "seasonal",
                "freelance"
            ),
            field: "employment_type",
        },
        isStar: {
            type: DataTypes.BOOLEAN,
            field: "is_star",
            defaultValue: false,
        },
        experienceCategoryId: {
            type: DataTypes.UUID,
            field: "experience_category_id",
        },
    },
    {
        tableName: "experiences",
        timestamps: true,
        paranoid: true,
        underscored: true,
    }
);

module.exports = Experience;
