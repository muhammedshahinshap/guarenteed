// modules
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./config/dbConfig").connect();
const userRoutes = require("./routes/users");
const companyRoutes = require("./routes/company");
const chatRoutes = require("./routes/chat");
const adminRoutes = require("./routes/admin");

// app
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// middlewares
app.use(morgan("dev"));
app.use(cors());
// routes
app.use("/users", userRoutes);
app.use("/company", companyRoutes);
app.use("/chat", chatRoutes);
app.use("/admin", adminRoutes);

module.exports = app;
