const { ObjectId } = require("mongodb");
const User = require("../models/userMdl");

module.exports = async (_id) => {
  try {
    const userExists = await User.findOne({ _id: ObjectId(_id) }).select(
      "-password"
    );
    return userExists;
  } catch (error) {
    console.log(error);
    return false;
  }
};
//
