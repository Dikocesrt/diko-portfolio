const express = require("express");
const path = require("path");
require("dotenv").config();
require("./configs/database");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server started on port " + port);
});
