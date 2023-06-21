const mongoose = require("mongoose");

const TitlesSchema = mongoose.Schema({
  Title: String,
  Elements: Array,
});

module.exports = mongoose.model("Titles", TitlesSchema, "Titles");
