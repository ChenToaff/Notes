const Notes = require("../../models/note");
const mongoose = require("mongoose");
module.exports = async (req, res) => {
  let { title, elements } = req.body;
  const id = req.params.id;

  const note = await Notes.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { title, elements, lastModified: new Date() },
    { new: true }
  );

  return res.status(200).send("edited a note");
};
