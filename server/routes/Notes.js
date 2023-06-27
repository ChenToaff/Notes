var express = require("express");
const router = express.Router();
const path = require("path");
const Notes = require("../models/note");

router.get("/", async (req, res) => {
  let titles = await Notes.find({}, { __v: 0 }).populate("elements");
  console.log({ titles });
  res.send(titles);
});

router.post("/changes", async (req, res) => {
  if (req.headers.token === "True") {
    let data = req.body.filter((el) => el != null);
    for (let i = 0; i < data.length; i++) {
      if (data[i].Elements)
        data[i].Elements = data[i].Elements.filter((el) => el != null);
    }
    Notes.collection.drop();
    for (let i = 0; i < data.length; i++) {
      const title = new Notes(data[i]);
      await title.save();
    }
    res.send(req.body);
    return;
  }
  res.status(400).send("Access Denied");
});

module.exports = router;
