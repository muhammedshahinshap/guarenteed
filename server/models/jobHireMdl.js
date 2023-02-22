const mongoose = require("mongoose");
let ObjectId = mongoose.Schema.ObjectId;
let jobs = new mongoose.Schema(
  {
    fk_id: { type: ObjectId },
    type: { type: String },
    noOfYears: { type: String },
    tech: { type: String },
    salary: { type: String },
    discription: { type: String },
    image: { type: String },
    status: { type: Boolean, default: true },
    reportStatus: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
let JobHire = mongoose.model("jobs", jobs);
module.exports = JobHire;
