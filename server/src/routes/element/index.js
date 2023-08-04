const router = require("express").Router();

router.delete("/:id", require("./delete"));
router.post("/", require("./create"));
// user.get("/:id", require("./get"));
router.patch("/:id", require("./edit"));

module.exports = router;
