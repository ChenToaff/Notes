const Elements = require("../../models/element");
const Notes = require("../../models/note");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  const { type, content, noteId } = req.body;
  console.log({ type, content, noteId });
  if (typeof type != "string" || typeof content != "string")
    return res.status(400).send("invalid element");
  if (!["Header", "Text"].includes(type))
    return res.status(400).send("invalid element");

  const notes = await Notes.find({});
  console.log({ notes });
  const note = await Notes.findById(new mongoose.Types.ObjectId(noteId));
  console.log({ note });
  if (!note) {
    return res.status(400).send("invalid parent note");
  }
  const element = new Elements({ type, content });
  await element.save();
  note.elements.push(element._id);
  note.save();
  return res
    .status(200)
    .send({ message: "added a new element to the note", element });
};
