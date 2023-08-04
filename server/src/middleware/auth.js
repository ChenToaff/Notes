const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");

module.exports = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(400).send("A token is required for authentication");
  }
  try {
    jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(403).send("Unauthorized");
  }
  return next();
};
