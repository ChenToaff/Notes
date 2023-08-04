const Elements = require("../../models/element");
const Notes = require("../../models/note");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  const { type, content, noteId } = req.body;
  if (typeof type != "string" || typeof content != "string")
    return res.status(400).send("invalid element");
  if (!["Header", "Text"].includes(type))
    return res.status(400).send("invalid element");

  const note = await Notes.findById(new mongoose.Types.ObjectId(noteId));
  if (!note) {
    return res.status(400).send("invalid parent note");
  }
  const element = new Elements({ type, content, noteId });
  await element.save();
  note.elements.push(element._id);
  note.lastModified = new Date();
  await note.save();
  await note.populate("elements");
  return res
    .status(200)
    .send({ message: "added a new element to the note", note });
};
