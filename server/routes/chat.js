const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const chatCntr = require("../controllers/chatCntr");

router.route("/search-user/:name").get(isAuth, chatCntr.searchUser);
router.route("/select-chat").post(isAuth, chatCntr.selectChat);
router.route("/get-chats").get(isAuth, chatCntr.myChats);
router.route("/get-chat-data/:id").get(isAuth, chatCntr.getChatData);
router.route("/user-data").get(isAuth, chatCntr.getUserdata);
router.route("/sent-message").post(isAuth, chatCntr.addNewMessage);

module.exports = router;
