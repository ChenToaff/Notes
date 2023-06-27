const Elements = require("../../models/element");
const mongoose = require("mongoose");
module.exports = async (req, res) => {
  let { content } = req.body;
  const id = req.params.id;
  console.log({ id, content });
  const element = await Elements.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { content },
    { new: true }
  );
  console.log({ element });
  return res.status(200).send("edited an element");
};
