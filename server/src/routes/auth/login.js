const sha256 = require("crypto-js/sha256");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../../config");

module.exports = async (req, res) => {
  let { userName, password } = req.body;

  if (!userName || !password) {
    return res.status(400).send("missing values");
  }
  const access_token = jwt.sign({ rold: "admin" }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.status(200).send(access_token);
};
