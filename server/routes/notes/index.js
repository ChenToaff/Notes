const router = require("express").Router();

router.delete("/:id", require("./delete"));
router.post("/", require("./create"));
router.get("/", require("./get"));
router.patch("/:id", require("./edit"));

module.exports = router;
