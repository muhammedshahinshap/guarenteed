const mongoose = require("mongoose");

const premium = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderId: { type: String },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
const Premium = mongoose.model("premium", premium);
module.exports = Premium;
