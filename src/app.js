const express = require("express");
const path = require("path");
const hbs = require("hbs");
const router = require("./routes/route");
const truncate = require("html-truncate");
require("dotenv").config();
require("./configs/database");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

app.use(router);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./templates/views"));
hbs.registerPartials(path.join(__dirname, "./templates/partials"));
hbs.registerHelper("truncate", function (text, limit) {
    if (!text) return "";
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
});
hbs.registerHelper("truncateHtml", function (htmlContent, maxWords) {
    const plainText = htmlContent.replace(/<[^>]*>/g, " ");
    const words = plainText.split(/\s+/).filter(Boolean);

    if (words.length <= maxWords) return htmlContent;

    const truncatedPlainText = words.slice(0, maxWords).join(" ") + "...";

    return truncate(htmlContent, truncatedPlainText.length);
});
hbs.registerHelper("ifEquals", function (v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server started on port " + port);
});
