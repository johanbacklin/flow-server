const express = require("express");
const server = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

server.use(express.json());
server.use(cookieParser());

server.use(
  cors({
    origin: "http://localstorage:3000",
    credentials: true,
  })
);
