const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  title: String,
  elements: [{ type: mongoose.Types.ObjectId, ref: "elements" }],
});

module.exports = mongoose.model("notes", NoteSchema);
