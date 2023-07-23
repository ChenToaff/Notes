const express = require("express");
const cors = require("cors");
const server = express();

server.use(cors());
server.use(express.json());
server.use(require("./middleware/responses"));
server.use("/api/", require("./routes"));

server.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

server.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

module.exports = server;
