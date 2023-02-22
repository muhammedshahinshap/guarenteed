const mongoose = require("mongoose");

const chat = new mongoose.Schema(
  {
    userIdInitiative: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    userIdreciver: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
const Chat = mongoose.model("chats", chat);
module.exports = Chat;
