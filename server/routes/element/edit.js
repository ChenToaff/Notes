const Elements = require("../../models/element");
const Notes = require("../../models/note");

const mongoose = require("mongoose");
module.exports = async (req, res) => {
  let { content } = req.body;
  const id = req.params.id;
  const element = await Elements.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { content },
    { new: true }
  );
  const note = await Notes.updateOne(
    { id: new mongoose.Types.ObjectId(element.noteId) },
    { $set: { lastModified: new Date() } }
  );

  console.log({ element });
  return res.status(200).send("edited an element");
};
