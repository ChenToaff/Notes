const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://127.0.0.1/Menu");
mongoose.connection.on("error", (err) => {
  console.log("mongoose: ", err);
});

const TitlesSchema = mongoose.Schema({
  Title: String,
  Elements: Array,
});
mongoose.model("Titles", TitlesSchema, "Titles");

module.exports = mongoose;
