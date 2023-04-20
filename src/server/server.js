const express = require("express");
const server = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

//middleware
const {
  checkAuthentication,
} = require("../controllers/middleware/checkAuthentication");

//Routes
const { authenticationRoute } = require("../routes/authenticationRoute");
const { postsRoute } = require("../routes/postsRoute");
const { usersRoute } = require("../routes/usersRoute");

server.use(express.json());
server.use(cookieParser());

server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

server.use("/authentication", authenticationRoute);
server.use("/posts", checkAuthentication, postsRoute);
server.use("/users", usersRoute);

exports.server = server;
