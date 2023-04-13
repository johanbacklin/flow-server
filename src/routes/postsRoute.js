const express = require("express");

//Controllers
const { addPost } = require("../controllers/postsRoute/addPost");
const {
  getFollowingPosts,
} = require("../controllers/postsRoute/getFollowingPosts");
const { postGet } = require("../controllers/postsRoute/postGet");

const postsRoute = express.Router();

postsRoute.get("/following", getFollowingPosts);

postsRoute.post("/add", addPost);

postsRoute.get("/get/:username", postGet);

exports.postsRoute = postsRoute;
