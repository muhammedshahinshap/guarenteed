const asyncHandler = require("express-async-handler");
const JobHire = require("../models/jobHireMdl");
const User = require("../models/userMdl");
const Premium = require("../models/orderMdl");

const Users = asyncHandler(async (req, res) => {
  try {
    const result = await User.find({
      role: "user",
      status: true,
      currentstatus: "active",
    }).select("-password");
    result
      ? res.status(200).json({
          messege: "SuccessFully Completed",
          error: false,
          data: [result],
        })
      : res.status(500).json({
          messege: "Try again",
          error: true,
          data: [],
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      messege: "Try Again",
      data: [],
    });
  }
});

const ReportedUsers = asyncHandler(async (req, res) => {
  try {
    const result = await User.find({ role: "user", status: false }).select(
      "-password"
    );
    result
      ? res.status(200).json({
          messege: "SuccessFully Completed",
          error: false,
          data: [result],
        })
      : res.status(500).json({
          messege: "Try again",
          error: true,
          data: [],
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      messege: "Try Again",
      data: [],
    });
  }
});

const Companies = asyncHandler(async (req, res) => {
  try {
    const result = await User.find({
      role: "company",
      status: true,
      currentstatus: "active",
    }).select("-password");
    result
      ? res.status(200).json({
          messege: "SuccessFully Completed",
          error: false,
          data: [result],
        })
      : res.status(500).json({
          messege: "Try again",
          error: true,
          data: [],
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      messege: "Try Again",
      data: [],
    });
  }
});
const ReportedCompanies = asyncHandler(async (req, res) => {
  try {
    const result = await User.find({ role: "company", status: false }).select(
      "-password"
    );
    result
      ? res.status(200).json({
          messege: "SuccessFully Completed",
          error: false,
          data: [result],
        })
      : res.status(500).json({
          messege: "Try again",
          error: true,
          data: [],
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      messege: "Try Again",
      data: [],
    });
  }
});

const PremiumUsers = asyncHandler(async (req, res) => {
  try {
    const result = await User.find({
      role: "user",
      premium: true,
      status: true,
      currentstatus: "active",
    }).select("-password");
    result
      ? res.status(200).json({
          messege: "SuccessFully Completed",
          error: false,
          data: [result],
        })
      : res.status(500).json({
          messege: "Try again",
          error: true,
          data: [],
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      messege: "Try Again",
      data: [],
    });
  }
});

const PremiumCompanies = asyncHandler(async (req, res) => {
  try {
    const result = await User.find({
      role: "company",
      premium: true,
      status: true,
      currentstatus: "active",
    }).select("-password");
    result
      ? res.status(200).json({
          messege: "SuccessFully Completed",
          error: false,
          data: [result],
        })
      : res.status(500).json({
          messege: "Try again",
          error: true,
          data: [],
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      messege: "Try Again",
      data: [],
    });
  }
});

const reportUser = asyncHandler(async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: false,
        },
      }
    );
    data
      ? res.status(200).json({
          messege: "SuccessFully Completed",
          error: false,
          data: [],
        })
      : res.status(500).json({
          messege: "Try again",
          error: true,
          data: [],
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messege: "Try again",
      error: true,
      data: [],
    });
  }
});

const activeJobs = asyncHandler(async (req, res) => {
  try {
    const data = await JobHire.aggregate([
      { $match: { status: true, reportStatus: false } },
      {
        $lookup: {
          from: "users",
          localField: "fk_id",
          foreignField: "_id",
          as: "data",
        },
      },
    ]);
    data
      ? res.status(200).json({
          messege: "SuccessFully Completed",
          error: false,
          data: [data],
        })
      : res.status(500).json({
          messege: "Try again",
          error: true,
          data: [],
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messege: "Try again",
      error: true,
      data: [],
    });
  }
});

const reportedJobs = asyncHandler(async (req, res) => {
  try {
    const data = await JobHire.aggregate([
      { $match: { reportStatus: true } },
      {
        $lookup: {
          from: "users",
          localField: "fk_id",
          foreignField: "_id",
          as: "data",
        },
      },
    ]);
    data
      ? res.status(200).json({
          messege: "SuccessFully Completed",
          error: false,
          data: [data],
        })
      : res.status(500).json({
          messege: "Try again",
          error: true,
          data: [],
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messege: "Try again",
      error: true,
      data: [],
    });
  }
});

const expiredJobs = asyncHandler(async (req, res) => {
  try {
    const data = await JobHire.aggregate([
      { $match: { status: false, reportStatus: false } },
      {
        $lookup: {
          from: "users",
          localField: "fk_id",
          foreignField: "_id",
          as: "data",
        },
      },
    ]);
    data
      ? res.status(200).json({
          messege: "SuccessFully Completed",
          error: false,
          data: [data],
        })
      : res.status(500).json({
          messege: "Try again",
          error: true,
          data: [],
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messege: "Try again",
      error: true,
      data: [],
    });
  }
});

const reportJob = asyncHandler(async (req, res) => {
  try {
    const data = await JobHire.updateOne(
      { _id: req.params.id },
      {
        $set: {
          reportStatus: true,
        },
      }
    );
    console.log(data);
    data
      ? res.status(200).json({
          messege: "SuccessFully Completed",
          error: false,
          data: [],
        })
      : res.status(500).json({
          messege: "Try again",
          error: true,
          data: [],
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messege: "Try again",
      error: true,
      data: [],
    });
  }
});

const activateUser = asyncHandler(async (req, res) => {
  try {
    const data = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: true,
        },
      }
    );
    data
      ? res.status(200).json({
          messege: "SuccessFully Completed",
          error: false,
          data: [],
        })
      : res.status(500).json({
          messege: "Try again",
          error: true,
          data: [],
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      messege: "Try again",
      error: true,
      data: [],
    });
  }
});

const getPaymentData = asyncHandler(async (req, res) => {
  try {
    const data = await Premium.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "data",
        },
      },
    ]);
    data
      ? res.status(200).json({
          messege: "SuccessFully Completed",
          error: false,
          data: [data],
        })
      : res.status(500).json({
          messege: "Try again",
          error: true,
          data: [],
        });
  } catch (error) {
    res.status(500).json({
      messege: "Something went wrong",
      error: true,
      data: [],
    });
    console.log(error);
  }
});

const yearWisedata = asyncHandler(async (req, res) => {
  try {
    const data = await User.aggregate([
      {
        $group: {
          _id: {
            $year: "$createdAt",
          },
          sum: { $sum: 1 },
        },
      },
    ]);
    const pending = await User.aggregate([
      {
        $match: {
          currentstatus: "pending",
        },
      },
      {
        $group: {
          _id: {
            $year: "$createdAt",
          },
          sum: { $sum: 1 },
        },
      },
    ]);
    const year = data.map(({ _id }) => _id);
    const sum = data.map(({ sum }) => sum);
    const pend = pending.map(({ sum }) => sum);
    data
      ? res.status(200).json({
          messege: "SuccessFully Completed",
          error: false,
          data: [year, sum, pend],
        })
      : res.status(500).json({
          messege: "Try again",
          error: true,
          data: [],
        });
  } catch (error) {
    res.status(500).json({
      messege: "Something went wrong",
      error: true,
      data: [],
    });
    console.log(error);
  }
});

const PremiumOrNot = asyncHandler(async (req, res) => {
  try {
    const data = await User.aggregate([
      {
        $group: {
          _id: "$premium",
          sum: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const count = data.map(({ sum }) => sum);
    data
      ? res.status(200).json({
          messege: "SuccessFully Completed",
          error: false,
          data: [count],
        })
      : res.status(500).json({
          messege: "Try again",
          error: true,
          data: [],
        });
  } catch (error) {
    res.status(500).json({
      messege: "Something went wrong",
      error: true,
      data: [],
    });
    console.log(error);
  }
});

module.exports = {
  Users,
  Companies,
  reportUser,
  ReportedUsers,
  ReportedCompanies,
  PremiumUsers,
  PremiumCompanies,
  activeJobs,
  expiredJobs,
  reportedJobs,
  reportJob,
  activateUser,
  getPaymentData,
  yearWisedata,
  PremiumOrNot,
};
