const asyncHandler = require("express-async-handler");
const { ObjectId } = require("mongodb");
const Chat = require("../models/chatMdl");
const Message = require("../models/messegeMdl");
const User = require("../models/userMdl");

const searchUser = asyncHandler(async (req, res) => {
  try {
    const name = req.params.name;
    const result = await User.find({
      $or: [{ username: { $regex: name } }, { c_profile: { $regex: name } }],
      $and: [{ username: { $ne: req.user.username } }],
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

const selectChat = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const uid = req.user._id;
    const check = await Chat.findOne({
      $or: [
        {
          userIdInitiative: uid,
          userIdreciver: id,
        },
        {
          userIdInitiative: id,
          userIdreciver: uid,
        },
      ],
    });
    if (check) {
      res.status(200).json({
        messege: "SuccessFully Completed",
        error: false,
        data: [{ id: check._id }],
      });
    } else {
      const create = await Chat.create({
        userIdInitiative: uid,
        userIdreciver: id,
      });
      create
        ? res.status(200).json({
            messege: "SuccessFully Completed",
            error: false,
            data: [{ id: create._id }],
          })
        : res.status(500).json({
            error: true,
            messege: "Try Again",
            data: [],
          });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      messege: "Something went wrong",
      data: [],
    });
  }
});

const myChats = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const check = await Chat.aggregate([
      {
        $match: {
          $or: [
            {
              userIdInitiative: _id,
            },
            {
              userIdreciver: _id,
            },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          let: {
            userIdInitiative: "$userIdInitiative",
            userIdreciver: "$userIdreciver",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $or: [
                        {
                          $eq: ["$_id", "$$userIdInitiative"],
                        },
                        {
                          $eq: ["$_id", "$$userIdreciver"],
                        },
                      ],
                    },
                    {
                      $ne: ["$_id", _id],
                    },
                  ],
                },
              },
            },
          ],
          as: "data",
        },
      },
    ]);
    check
      ? res.status(200).json({
          messege: "SuccessFully Completed",
          error: false,
          data: [check],
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

const getChatData = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.aggregate([
      { $match: { $and: [{ chat: ObjectId(id) }] } },
      {
        $lookup: {
          from: "chats",
          localField: "chat",
          foreignField: "_id",
          as: "data",
        },
      },
      {
        //   $lookup: {
        //     from: "users",
        //     localField: "data.userIdInitiative",
        //     localField: "data.userIdreciver",
        //     foreignField: "_id",
        //     as: "datas",
        //   },
        $lookup: {
          from: "users",
          let: {
            userIdInitiative: "data.userIdInitiative",
            userIdreciver: "data.userIdreciver",
          },
          pipeline: [
            {
              $match: {
                $expr: [
                  {
                    $or: [
                      {
                        $eq: ["$_id", "$$userIdInitiative"],
                      },
                      {
                        $eq: ["$_id", "$$userIdreciver"],
                      },
                    ],
                  },
                ],
              },
            },
          ],
          as: "datas",
        },
      },
    ]);

    message
      ? res.status(200).json({
          messege: "SuccessFully Completed",
          error: false,
          data: [message],
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
const getUserdata = asyncHandler((req, res) => {
  res.status(200).json({
    error: false,
    messege: "SuccessFully Completed",
    data: [req.user],
  });
});

const addNewMessage = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const { newMessage, selectChat } = req.body;
    const response = await Message.create({
      sender: _id,
      content: newMessage,
      chat: selectChat,
    });
    response
      ? res.status(200).json({
          error: false,
          messege: "SuccessFully Completed",
          data: [response],
        })
      : res.status(500).json({
          error: true,
          messege: "Try again",
          data: [],
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      messege: "Some thing went Wrong",
      data: [],
    });
  }
});
module.exports = {
  searchUser,
  selectChat,
  myChats,
  getChatData,
  getUserdata,
  addNewMessage,
};
