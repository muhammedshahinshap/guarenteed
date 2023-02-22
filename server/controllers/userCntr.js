const asyncHandler = require("express-async-handler");
const argon2 = require("argon2");
const crypto = require("crypto");
const User = require("../models/userMdl");
const generateToken = require("../utils/generateToken");
const { ObjectId } = require("mongodb");
const nodemailer = require("nodemailer");
const path = require("path");
const JobHire = require("../models/jobHireMdl");
const Premium = require("../models/orderMdl");
const jobApply = require("../models/jobApply");

let otp;
let otptime;
let otpusername;
let validator;
let blockClearence;
const clear = () => {
  otptime = "";
  otpusername = "";
  otp = "";
  validator = "";
};
const cleatTimeOUTs = () => {
  clearTimeout(blockClearence);
};
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "muhammedshahinshap07@gmail.com",
    pass: "ayujkizpxqdyqpok",
  },
});
const userCntr = asyncHandler(async (req, res) => {
  let { username, password, valid } = req.body;
  if (!username || !password) {
    res.status(200).json({
      message: "Please Enter all Fields",
      error: true,
      data: [],
    });
    throw new Error("Please Enter all Fields");
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(200).json({
      message: "User Already Exist",
      error: true,
      data: [],
    });
    throw new Error("User Already Exist");
  }
  const status = valid ? "active" : "pending";
  try {
    crypto.randomBytes(32, async (err, buf) => {
      password = await argon2.hash(req.body.password, buf);
      const userCreate = await User.create({
        username,
        password,
        currentstatus: status,
      });
      if (userCreate) {
        !valid && verificationEmail(username, userCreate._id);
        res.status(200).json({
          message: "Successfully Completed",
          error: false,
          data: [],
        });
      } else throw new Error("Try Again");
    });
  } catch (error) {
    console.log(error);
    throw new Error("ERR in Encryption");
  }
});

const loginCntr = asyncHandler(async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    res.status(200).json({
      message: "Please Enter all Fields",
      error: true,
      data: [],
    });
    throw new Error("Please Enter all Fields");
  }

  const userExists = await User.findOne({
    username,
    status: true,
    currentstatus: "active",
  });
  if (userExists) {
    if (await argon2.verify(userExists.password, password)) {
      const token = generateToken(userExists);
      res.status(200).json({
        error: false,
        messege: "SET_LOGIN",
        data: [
          {
            token: token,
            data: userExists,
          },
        ],
      });
    }
  } else {
    res.status(200).json({
      message: "invalid user name",
      error: true,
      data: [],
    });
    throw new Error("invalid user name");
  }
});

const userProfile = asyncHandler(async (req, res) => {
  const id = req.user._id;
  let profilePicture = req.filename;
  const { name, gender, address, place, domain, experience, contact } =
    req.body;
  if (
    !name ||
    !gender ||
    !address ||
    !place ||
    !domain ||
    !experience ||
    !contact
  ) {
    res.status(200).json({
      messege: "Please Enter all Fields",
      error: true,
      data: [],
    });
    throw new Error("Please Enter all Fields");
  }

  if (!profilePicture) {
    profilePicture = req.user.u_profile.profilePicture;
  }

  const u_profile = {
    name,
    gender,
    address,
    place,
    domain,
    experience,
    contact,
    profilePicture,
  };
  const userProfile = await User.updateOne(
    { _id: ObjectId(id) },
    {
      $set: {
        role: "user",
        u_profile,
      },
    }
  );
  if (userProfile) {
    const userExists = await User.findById({ _id: id });
    const token = generateToken(userExists);
    res.status(200).json({
      error: false,
      messege: "SET_LOGIN",
      data: [
        {
          token: token,
          data: userExists,
        },
      ],
    });
  } else {
    res.status(500).json({
      error: true,
      messege: "Try Again",
      data: [],
    });
  }
});

const companyProfile = asyncHandler(async (req, res) => {
  const id = req.user._id;
  let profilePicture = req.filename;
  const { name, address, regno, website } = req.body;
  if (!name || !address || !regno || !website || !id) {
    res.status(200).json({
      message: "Please Enter all Fields",
      error: true,
      data: [],
    });
    throw new Error("Please Enter all Fields");
  }
  if (!profilePicture) {
    profilePicture = req.user.c_profile.profilePicture;
  }
  const c_profile = {
    name,
    address,
    regno,
    website,
    profilePicture,
  };

  const userProfile = await User.updateOne(
    { _id: ObjectId(id) },
    {
      $set: {
        role: "company",
        c_profile,
      },
    }
  );

  if (userProfile) {
    const userExists = await User.findById({ _id: id });
    const token = generateToken(userExists);
    res.status(200).json({
      error: false,
      messege: "SET_LOGIN",
      data: [
        {
          token: token,
          data: userExists,
        },
      ],
    });
  } else {
    res.status(500).json({
      error: true,
      messege: "Try Again",
      data: [],
    });
  }
});

const getUserdata = asyncHandler(async (req, res, next) => {
  const username = req.body.username;
  try {
    const userExists = await User.findOne({
      username,
      currentstatus: "active",
      status: true,
    });
    const token = generateToken(userExists);
    res.status(200).json({
      error: false,
      messege: "SET_LOGIN",
      data: [
        {
          token: token,
          data: userExists,
        },
      ],
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

const getUserprofile = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const userProfile = await User.findById({ _id });
    userProfile
      ? res.status(200).json({
          error: false,
          messege: "Successfully Completed",
          data: [userProfile],
        })
      : res.status(500).json({
          error: true,
          messege: "Try Again",
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
const sentMail = asyncHandler(async (req, res) => {
  try {
    let validator = true;
    const { id, fullname, email, address, city, zip, contact } = req.body;

    if (!req.user.premium) {
      const noOfapplications = await jobApply.aggregate([
        {
          $match: { userId: ObjectId(req.user._id) },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        { $match: { month: new Date().getMonth() + 1 } },
        { $count: "total" },
      ]);
      const { total } = noOfapplications?.[0] ?? [];
      validator = total >= 5 ? false : true;
    }

    if (validator) {
      const data = await JobHire.aggregate([
        { $match: { _id: ObjectId(id) } },
        {
          $lookup: {
            from: "users",
            localField: "fk_id",
            foreignField: "_id",
            as: "data",
          },
        },
      ]);

      const job = await jobApply.create({
        userId: req.user._id,
        companyId: data[0].fk_id,
        jobId: data[0]._id,
        fullname: fullname,
        email: email,
        address: address,
        city: city,
        zip: zip,
        contact: contact,
        file: req.filename,
      });

      const { username } = data?.[0]?.data?.[0];
      const html = `
      <div class='container'>
      <div class='row >
      <div class='col-sm-12'>
      <h3>
      Hello sir i am
      ${fullname}
      </h3>
      </div>
      </div>
      <div class='row >
      <div class='col-sm-12'>
      <h4>
      I am interested in working with your company.
      </h4>
      </div>
      </div>
      <div class='row >
      <div class='col-sm-12'>
      <h4>
      Currently i am living in this address <br>
      ${address}
      <br>
      ${city}
      <br>
      ${zip}
      </h4>
      </div>
      </div>
      <div class='row >
      <div class='col-sm-12'>
      <h4>
      Please contact me if you are interested in my CV which i have attached :
     <span style='color:blue' ><b>${contact}</b></span>
      </h4>
      </div>
      </div>
      </div>`;
      const info = await transporter.sendMail({
        from: `${email}`,
        to: `${username}`,
        subject: `MR/MRS ${req.user.u_profile.name} (${req.user.username}) Has Responded To Your Post in Guarenteed`,
        text: `MR/MRS ${req.user.u_profile.name} (${req.user.username}) Has Responded To Your Post in Guarenteed`,
        html: html,
        attachments: [
          {
            filename: `${req.fileOrginalname}`,
            path: `${path.join(__dirname, "../public/hirecv")}/${req.filename}`,
          },
        ],
      });
      info.messageId
        ? res.status(200).json({
            error: false,
            messege: "Successfully Completed",
            data: [],
          })
        : res.status(500).json({
            error: true,
            messege: "Try Again",
            data: [],
          });
    } else {
      res.status(200).json({
        error: false,
        messege: "Upgrade to premium for unlimited applications",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      messege: "Try Again",
      data: [],
    });
  }
});

const addToWishlist = asyncHandler(async (req, res) => {
  try {
    const Add = await User.updateOne(
      { _id: ObjectId(req.user._id) },
      {
        $addToSet: {
          wishList: [{ _id: req.params.id }],
        },
      }
    );
    Add
      ? res.status(200).json({
          error: false,
          messege: "Successfully Completed",
          data: [],
        })
      : res.status(500).json({
          error: true,
          messege: "Try Again",
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
const wishListData = asyncHandler(async (req, res) => {
  try {
    const data = await User.aggregate([
      { $match: { _id: ObjectId(req.user._id) } },
      {
        $lookup: {
          from: "jobs",
          localField: "wishList._id",
          foreignField: "_id",
          as: "data",
        },
      },
      {
        $match: { "data.status": true, "data.reportStatus": false },
      },
    ]);
    data
      ? res.status(200).json({
          error: false,
          messege: "Successfully Completed",
          data: [data?.[0]?.data, data?.[0]?.datas],
        })
      : res.status(500).json({
          error: true,
          messege: "Try Again",
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
const orderNumber = () => {
  let now = Date.now().toString();
  now += now + Math.floor(Math.random() * 10);
  return [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join("-");
};
const getPremium = asyncHandler(async (req, res) => {
  try {
    const data = await Premium.create({
      userId: ObjectId(req.user._id),
      orderId: orderNumber(),
    });
    const user = await User.updateOne(
      { _id: ObjectId(req.user._id) },
      {
        $set: {
          premium: true,
        },
      }
    );
    data && user
      ? res.status(200).json({
          error: false,
          messege: "Successfully Completed",
          data: [],
        })
      : res.status(500).json({
          error: true,
          messege: "Try Again",
          data: [],
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      messege: "Something went wrong",
      data: [],
    });
  }
});

const getJobappications = asyncHandler(async (req, res) => {
  try {
    let match;
    if (req.user.role === "user") {
      match = {
        $match: { userId: req.user._id, status: true },
      };
    } else if (req.user.role === "company") {
      match = {
        $match: {
          companyId: req.user._id,
          status: true,
          jobId: ObjectId(req.params.id),
        },
      };
    }
    const data = await jobApply.aggregate([
      match,
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "companyId",
          foreignField: "_id",
          as: "companies",
        },
      },
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "jobs",
        },
      },
      { $unwind: "$jobs" },
      { $match: { "jobs.status": true } },
      { $sort: { _id: 1 } },
    ]);
    data
      ? res.status(200).json({
          error: false,
          messege: "Successfully Completed",
          data: [data, req.user.role],
        })
      : res.status(500).json({
          error: true,
          messege: "Try Again",
          data: [],
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      messege: "something went wrong",
      data: [],
    });
  }
});

const verificationEmail = async (mail, id) => {
  const info = await transporter.sendMail({
    from: `muhammedshahinshap07@gmail.com`,
    to: `${mail}`,
    subject: `Guarenteed verification mail`,
    text: `please click on the link to confirm`,
    html: `This is a verification process from guarenteed please click the link to verify <a href='https://guarenteed.tech/verify/${id}' >Click Here</a>`,
  });
};
const verifyUser = asyncHandler(async (req, res) => {
  try {
    const varify = await User.updateOne(
      {
        _id: ObjectId(req.params.id),
        currentstatus: "pending",
        status: true,
      },
      {
        $set: {
          currentstatus: "active",
        },
      }
    );
    varify ? res.status(200).json("success") : res.status(500).json("error");
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});

const cancelApplication = asyncHandler(async (req, res) => {
  try {
    console.log(req.params.id);
    const cancel = await jobApply.updateOne(
      {
        _id: ObjectId(req.params.id),
      },
      {
        $set: {
          status: false,
        },
      }
    );
    cancel
      ? res.status(200).json({
          error: false,
          messege: "Successfully Completed",
          data: [],
        })
      : res.status(200).json({
          error: true,
          messege: "Try again",
          data: [],
        });
  } catch (error) {
    res.status(200).json({
      error: true,
      messege: "something went wrong",
      data: [],
    });
    console.log(error);
  }
});

const sendOTP = asyncHandler(async (req, res) => {
  try {
    const { username } = req.body;
    let now = "";
    const validate = await User.findOne({ username: username ?? otpusername });
    if (!validate) {
      res.status(200).json({
        error: true,
        messege: "Incorrect Email",
        data: [],
      });
      throw new Error("Incorrect Email");
    }
    cleatTimeOUTs();
    otpusername = username ?? otpusername;
    otp = Date.now().toString().substring(8, 12);
    const html = `Your OTP is ${otp}`;
    const info = await transporter.sendMail({
      from: "muhammedshahinshap07@gmail.com",
      to: `${username}`,
      subject: `Reset your password`,
      text: `Your OTP is here`,
      html: html,
    });

    now = new Date();
    now.setMinutes(now.getMinutes() + 2, 0).toString();
    otptime = now;
    if (info.messageId) {
      res.status(200).json({
        error: false,
        messege: "Your OTP is mailed",
        data: [now],
      });
    } else {
      res.status(200).json({
        error: true,
        messege: "Can't genarate OTP",
        data: [],
      });
    }
  } catch (error) {
    res.status(200).json({
      error: true,
      messege: "something went wrong",
      data: [],
    });
    console.log(error);
  }
});

const getOTPTime = asyncHandler((req, res) => {
  try {
    if (otpusername) {
      res.status(200).json({
        error: false,
        messege: "Success",
        data: [{ time: otptime }, { username: otpusername }],
      });
    } else {
      clear();
      res.status(200).json({
        error: true,
        messege: "Try again",
        data: [],
      });
    }
  } catch (error) {
    res.status(200).json({
      error: true,
      messege: "something went wrong",
      data: [],
    });
    console.log(error);
  }
});

const validateOTP = asyncHandler((req, res) => {
  try {
    if (otp == req.body.OTP && req.body.mail == otpusername) {
      validator = otp;
      blockClearence = setTimeout(() => {
        clear();
      }, 1000 * 300);
      res.status(200).json({
        error: false,
        messege: "You got 5 minutes to update your password",
        data: [{ time: otptime }, { username: otpusername }],
      });
    } else {
      res.status(200).json({
        error: true,
        messege: "Incorrect OTP Try again",
        data: [],
      });
    }
  } catch (error) {
    res.status(200).json({
      error: true,
      messege: "Something went wrong",
      data: [],
    });
    console.log(error);
  }
});

const getMail = asyncHandler((req, res) => {
  res.status(200).json({
    error: false,
    messege: "Success",
    data: [otpusername, validator],
  });
});

const clearAll = asyncHandler((req, res) => {
  clear();
  res.status(200).json({
    error: false,
    messege: "Success",
    data: [],
  });
});

const clearTimeouts = asyncHandler((req, res) => {
  otptime = "";
  otp = "";
  res.status(200).json({
    message: "Successfully Completed",
    error: false,
    data: [],
  });
});

const resetPassword = asyncHandler((req, res) => {
  try {
    crypto.randomBytes(32, async (err, buf) => {
      const password = await argon2.hash(req.body.password, buf);
      const userCreate = await User.updateOne(
        {
          username: otpusername,
        },
        {
          $set: {
            password,
          },
        }
      );
      if (userCreate) {
        clear();
        res.status(200).json({
          message: "Successfully Completed",
          error: false,
          data: [],
        });
      } else {
        res.status(200).json({
          message: "Try again",
          error: true,
          data: [],
        });
      }
    });
  } catch (error) {
    res.status(200).json({
      error: true,
      messege: "something went wrong",
      data: [],
    });
    console.log(error);
  }
});
module.exports = {
  userCntr,
  loginCntr,
  userProfile,
  companyProfile,
  getUserdata,
  getUserprofile,
  sentMail,
  addToWishlist,
  wishListData,
  getPremium,
  getJobappications,
  verifyUser,
  cancelApplication,
  sendOTP,
  getOTPTime,
  validateOTP,
  getMail,
  clearAll,
  resetPassword,
  clearTimeouts,
};
