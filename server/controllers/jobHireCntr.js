const asyncHandler = require("express-async-handler");
const { toNumber } = require("lodash");
const { ObjectId } = require("mongodb");
const JobHire = require("../models/jobHireMdl");
const User = require("../models/userMdl");
const jobHireCntr = asyncHandler(async (req, res, next) => {
  try {
    let validator = true;
    let image = req.filename;
    const { type, noOfYears, tech, salary, discription, status, id } = req.body;
    const fk_id = req.user._id;
    if (!type || !noOfYears || !tech || !salary || !discription) {
      res.status(200).json({
        message: "Please Enter all Fields",
        error: true,
        data: [],
      });
      throw new Error("Please Enter all Fields");
    }

    if (!req.user.premium && !id) {
      const noOfpost = await JobHire.aggregate([
        {
          $match: { fk_id: ObjectId(req.user._id) },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        { $match: { month: new Date().getMonth() + 1 } },
        { $count: "total" },
      ]);
      const { total } = noOfpost?.[0] ?? [];
      validator = total >= 5 ? false : true;
    }

    let data;
    if (validator) {
      !id
        ? (data = await JobHire.create({
            type,
            noOfYears,
            tech,
            salary,
            image,
            discription,
            status,
            fk_id,
          }))
        : image
        ? (data = await JobHire.updateOne(
            { _id: ObjectId(id) },
            {
              type,
              noOfYears,
              tech,
              salary,
              image,
              discription,
              status,
            }
          ))
        : (data = await JobHire.updateOne(
            { _id: ObjectId(id) },
            {
              type,
              noOfYears,
              tech,
              salary,
              discription,
              status,
            }
          ));
      if (data) {
        res.status(200).json({
          message: "Successfully Completed",
          error: false,
          data: [],
        });
      } else {
        res.status(500).json({
          error: true,
          messege: "Try Again",
          data: [],
        });
        throw new Error("Try Again");
      }
    } else {
      res.status(200).json({
        message: "Plan Exhausted Upgrade to Premium",
        error: false,
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Try Again",
      data: [],
    });
    console.log(error);
  }
});

const jobHireData = asyncHandler(async (req, res, next) => {
  try {
    let data = await JobHire.find({
      fk_id: ObjectId(req.user._id),
      status: true,
      reportStatus: false,
    });

    if (data) {
      res.status(200).json({
        message: "Successfully Completed",
        error: false,
        data: [data],
      });
    } else {
      res.status(500).json({
        error: true,
        messege: "Try Again",
        data: [],
      });
      throw new Error("Try Again");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Try Again",
      data: [],
    });
  }
});

const jobHireDelete = asyncHandler(async (req, res, next) => {
  try {
    let data = await JobHire.updateOne(
      {
        _id: ObjectId(req.params.id),
      },
      {
        $set: {
          status: false,
        },
      }
    );
    if (data) {
      res.status(200).json({
        message: "Successfully Completed",
        error: false,
        data: [],
      });
    } else {
      res.status(500).json({
        error: true,
        messege: "Try Again",
        data: [],
      });
      throw new Error("Try Again");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Try Again",
      data: [],
    });
  }
});

const getHomeJobs = asyncHandler(async (req, res) => {
  try {
    let { date, limit, tech } = req.body;
    let query;
    if (date && tech) {
      query = {
        status: true,
        reportStatus: false,
        tech: { $regex: `.*${tech}.*`, $options: "i" },
        createdAt: { $gte: new Date(date) },
      };
    } else if (date) {
      query = {
        status: true,
        reportStatus: false,
        createdAt: { $gte: new Date(date) },
      };
    } else if (tech) {
      query = {
        status: true,
        reportStatus: false,
        tech: { $regex: `.*${tech}.*`, $options: "i" },
      };
    } else {
      query = { status: true, reportStatus: false };
    }
    const data = await JobHire.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "users",
          localField: "fk_id",
          foreignField: "_id",
          as: "data",
        },
      },
      { $limit: toNumber(limit) },
      { $sort: { _id: -1 } },
    ]);
    data
      ? res.status(200).json({
          message: "Successfully Completed",
          error: false,
          data: [data],
        })
      : res.status(500).json({
          error: true,
          message: "Try Again",
          data: [],
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Something went wrong",
      data: [],
    });
  }
});

const getJobData = asyncHandler(async (req, res) => {
  try {
    const data = await JobHire.findById({ _id: req.params.id });
    data
      ? res.status(200).json({
          message: "Successfully Completed",
          error: false,
          data: [data],
        })
      : res.status(500).json({
          error: true,
          message: "Try Again",
          data: [],
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Something went wrong",
      data: [],
    });
  }
});
const filterUsers = asyncHandler(async (req, res) => {
  try {
    const { year, tech } = req.body;
    let query;
    if (year && tech) {
      query = {
        "u_profile.domain": { $regex: `.*${tech}.*`, $options: "i" },
        "u_profile.experience": { $regex: `${year}.*`, $options: "i" },
      };
    } else if (tech) {
      query = {
        "u_profile.domain": { $regex: `.*${tech}.*`, $options: "i" },
      };
    } else {
      query = {
        "u_profile.experience": { $regex: `${year}.*`, $options: "i" },
      };
    }
    const data = await User.find(query, { _id: 0 });
    data
      ? res.status(200).json({
          message: "Successfully Completed",
          error: false,
          data: [data],
        })
      : res.status(500).json({
          error: true,
          message: "Try Again",
          data: [],
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: "Something went wrong",
      data: [],
    });
  }
});

module.exports = {
  jobHireCntr,
  jobHireData,
  jobHireDelete,
  getHomeJobs,
  getJobData,
  filterUsers,
};
