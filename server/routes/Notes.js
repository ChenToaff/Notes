var express = require("express");
const router = express.Router();
const path = require("path");
const Titles = require("../models/titles");

router.get("/", async (req, res) => {
  let titles = await Titles.find({}, { _id: 0, __v: 0 });
  res.send(titles);
});

router.post("/changes", async (req, res) => {
  if (req.headers.token === "True") {
    let data = req.body.filter((el) => el != null);
    for (let i = 0; i < data.length; i++) {
      if (data[i].Elements)
        data[i].Elements = data[i].Elements.filter((el) => el != null);
    }
    Titles.collection.drop();
    for (let i = 0; i < data.length; i++) {
      const title = new Titles(data[i]);
      await title.save();
    }
    res.send(req.body);
    return;
  }
  res.status(400).send("Access Denied");
});

module.exports = router;
