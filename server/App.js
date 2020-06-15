const express = require("express");
const cors = require("cors");
const notesRouter = require("./routes/Notes");
const path = require("path");
const db = require(path.resolve(__dirname, "./db.js"));

const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());
app.use("/Notes", notesRouter);
app.get("/", (req, res) => res.send("Api: Active"));

app.listen(port, () =>
  console.log(`server listening at http://localhost:${port}`)
);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});
