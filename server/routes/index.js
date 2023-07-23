const api = require("express").Router();

api.use("/element", require("./element"));
api.use("/notes", require("./notes"));

module.exports = api;
