const jwt = require("jsonwebtoken");
require("dotenv").config();
const getUserData = require("../utils/getUserData");
module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ messege: "UNAUTHERISED_ACCESS", error: true });
  }
  try {
    jwt.verify(token, '4ixa*jKi<@S|Ukyk', async (error, decoded) => {
      if (error) {
        return res
          .status(401)
          .json({ messege: "UNAUTHERISED_ACCESS", error: true });
      } else {
        const isValid = await getUserData(decoded.data._id);
        isValid
          ? (req.user = isValid)
          : res
              .status(401)
              .json({ messege: "UNAUTHERISED_ACCESS", error: true });
        next();
      }
    });
  } catch (err) {
    res.status(500).json({ messege: "Server Error" });
  }
};
