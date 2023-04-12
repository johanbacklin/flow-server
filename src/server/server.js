const express = require("express");
const server = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
//Routes
const { authenticationRoute } = require("../routes/authenticationRoute");
const {postsRoute}=require("../routes/postsRoute")

server.use(express.json());
server.use(cookieParser());

server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

server.use("/authentication", authenticationRoute);
server.use("/posts", postsRoute);

exports.server = server;
