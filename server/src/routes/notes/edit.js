const Notes = require("../../models/note");
const mongoose = require("mongoose");
module.exports = async (req, res) => {
  const id = req.params.id;
  if (!("image" in req.body))
    req.body.image = req.file ? `/api/images/${req.file.filename}` : undefined;

  const note = await Notes.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { ...req.body, lastModified: new Date() },
    { new: true }
  );
  //TODO: delete old image
  return res.status(200).send(note);
};
