const express = require("express");
const server = express();
const { db } = require("./database/database");

db.connect();

server.listen(5050);
