const api = require("express").Router();

api.use("/element", require("./element"));
api.use("/note", require("./note"));

module.exports = api;
