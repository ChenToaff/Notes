const express = require("express");
const cors = require("cors");
const notesRouter = require("./routes/Notes");
const mongoose = require("mongoose");

const app = express();
const port = 9000;
const MONGO_URL = "mongodb://127.0.0.1/Notes";
app.use(cors());
app.use(express.json());
app.use(require("./middleware/responses"));
app.use("/Notes", notesRouter);
app.use("/", require("./routes"));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

// Connect to the database
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");

    app.listen(port, () =>
      console.log(`server listening at http://localhost:${port}`)
    );
  })
  .catch((err) => console.error("There was an error:\n" + err));
