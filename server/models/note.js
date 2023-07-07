const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  title: String,
  elements: [{ type: mongoose.Types.ObjectId, ref: "elements" }],
  lastModified: { type: Date, default: new Date() },
});
NoteSchema.pre("deleteOne", function (next) {
  const note = this;
  note.model("elements").deleteOne({ noteId: note._id }, next);
});
module.exports = mongoose.model("notes", NoteSchema);
