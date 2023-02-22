
const app = require("../app");
const path = require("path");
const express = require("express");
require("dotenv").config();

const port = process.env.PORT || 7000;
app.set(port);
const server = app.listen(port, "localhost");
const io = require("socket.io")(server, {
  pingTimeout: 60000000,
  cors: {
    origin: "*",
  },
});

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "../../guarenteed/build")));
app.get("*", (req, res) =>
  res.sendFile(
    path.resolve(_dirname, "../../guarenteed", "build", "index.html")
  )
);


io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on("start-chat", (data) => {
    socket.join(data);
  });
  socket.on("new-message", (newMsgRecived) => {
    socket.in(newMsgRecived[0].chat).emit("message-recieved", newMsgRecived[0]);
  });
});
