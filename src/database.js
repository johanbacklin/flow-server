const { MongoClient } = require("mongodb");
require("dotenv").config();

const dbName = process.env.DATABASE_DATABASE;
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const url = `mongodb+srv://${user}:${password}@nackademin.oxogquo.mongodb.net/?retryWrites=true&w=majority`;

const db = { users: undefined, travelFeeds: undefined };

MongoClient.connect(url).then((client) => {
  db.users = client.db(dbName).collection("users");
  db.travelFeeds = client.db(dbName).collection("travelFeeds");
  console.log("Connected to database");
});

exports.db = db;
