const mongoose = require("mongoose");
const Elements = require("../../models/element");

module.exports = async (req, res) => {
  let id = req.params.id;
  let element = await Elements.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  if (!element || element.deletedCount === 0) {
    return res.status(400).send("No such element.");
  }
  return res.status(200).send("Element deleted");
};
