const multer = require("multer");
const path = require("path");
const upload = multer({ dest: path.join(process.cwd(), "images") });
module.exports = upload.single("image");
