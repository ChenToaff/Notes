const mongoose = require("mongoose");
const Elements = require("./element");
const element = require("./element");

const NoteSchema = mongoose.Schema({
  title: String,
  elements: [{ type: mongoose.Types.ObjectId, ref: "elements" }],
  lastModified: { type: Date, default: Date.now },
  color: {
    type: String,
    default: "#fff",
  },
});
NoteSchema.pre("deleteOne", async function (next) {
  await Elements.deleteMany({ noteId: this._id });
  next();
});
module.exports = mongoose.model("notes", NoteSchema);
