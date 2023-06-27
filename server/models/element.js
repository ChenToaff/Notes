const mongoose = require("mongoose");

const elementSchema = mongoose.Schema({
  type: String,
  content: String,
});

module.exports = mongoose.model("elements", elementSchema);
