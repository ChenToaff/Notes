const mongoose = require("mongoose");
const Elements = require("../../models/element");
const Notes = require("../../models/note");

module.exports = async (req, res) => {
  let id = req.params.id;
  let element = await Elements.findOneAndDelete({
    _id: new mongoose.Types.ObjectId(id),
  });
  if (!element || element.deletedCount === 0) {
    return res.status(400).send("No such element.");
  }
  const note = await Notes.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(element.noteId) },
    {
      $pull: { elements: { _id: new mongoose.Types.ObjectId(id) } },
      $set: { lastModified: new Date() },
    },
    { returnNewDocument: true }
  ).populate("elements");

  return res.status(200).send({ message: "Element deleted", note });
};
