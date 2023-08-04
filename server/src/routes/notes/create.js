const Notes = require("../../models/note");
module.exports = (req, res) => {
  //verify admin here.
  const note = new Notes();
  note.save();
  return res.status(200).send({ message: "created a new note", note });
};
