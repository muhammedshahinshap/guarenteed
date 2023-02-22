const mongoose = require("mongoose");
const jobapply = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    companyId: { type: mongoose.Schema.Types.ObjectId },
    jobId: { type: mongoose.Schema.Types.ObjectId },
    fullname: { type: String },
    email: { type: String },
    address: { type: String },
    city: { type: String },
    zip: { type: String },
    contact: { type: String },
    file: { type: String },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
const jobApply = mongoose.model("jobapply", jobapply);
module.exports = jobApply;
