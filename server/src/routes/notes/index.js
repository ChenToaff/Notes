const router = require("express").Router();
const fileUpload = require("../../middleware/fileUpload");

router.delete("/:id", require("./delete"));
router.post("/", require("./create"));
router.get("/", require("./get"));
router.patch("/:id", fileUpload, require("./edit"));

module.exports = router;
