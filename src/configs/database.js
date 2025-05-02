const { Sequelize } = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: process.env.DB_PORT,
        logging: false,
    }
);

const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully!");
    } catch (error) {
        console.error("❌ Unable to connect to the database:", error);
    }
};

initializeDatabase();

module.exports = sequelize;
