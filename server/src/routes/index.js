const express = require("express");
const path = require("path");
const router = require("express").Router();

router.use("/element", require("./element"));
router.use("/notes", require("./notes"));
router.use("/images", [
  /*require("./middleware/auth"),*/
  express.static(path.join(process.cwd(), "images")),
]);
router.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

module.exports = router;
