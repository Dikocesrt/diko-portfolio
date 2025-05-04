const express = require("express");
const path = require("path");
const hbs = require("hbs");
const router = require("./routes/route");
require("dotenv").config();
require("./configs/database");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

app.use(router);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./templates/views"));
hbs.registerPartials(path.join(__dirname, "./templates/partials"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server started on port " + port);
});
