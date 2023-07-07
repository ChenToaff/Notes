const mongoose = require("mongoose");

const elementSchema = mongoose.Schema({
  type: String,
  content: String,
  noteId: { type: mongoose.Types.ObjectId, ref: "notes" },
});

module.exports = mongoose.model("elements", elementSchema);
