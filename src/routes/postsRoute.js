const express = require("express");
const {
  getFollowingPosts,
} = require("../controllers/postsRoute/getFollowingPosts");

const postsRoute = express.Router();

postsRoute.get("/getFollowingPosts", getFollowingPosts);

exports.postsRoute = postsRoute;
