const mongoose = require("mongoose");
const Notes = require("../../models/note");

module.exports = async (req, res) => {
  let id = req.params.id;
  let note = await Notes.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  if (!note || note.deletedCount === 0) {
    return res.status(400).send("No such element.");
  }
  return res.status(200).send("Note deleted");
};
