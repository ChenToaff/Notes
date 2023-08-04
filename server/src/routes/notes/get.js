var express = require("express");
const router = express.Router();
const Notes = require("../../models/note");

router.get("/", async (req, res) => {
  let notes = await Notes.find({})
    .sort({ lastModified: -1 })
    .populate("elements");
  res.status(200).send(notes);
});

module.exports = router;
