const cloudinary = require("../configs/cloudinary");

const getURL = (public_id, width, height) => {
    const url = cloudinary.url(public_id, {
        transformation: [
            {
                width: width,
                height: height,
                crop: "fill",
                gravity: "auto",
            },
            {
                quality: "auto",
                fetch_format: "auto",
            },
        ],
    });

    return url;
};

module.exports = getURL;
