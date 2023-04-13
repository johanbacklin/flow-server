const express = require("express");
const {
  getFollowingPosts,
} = require("../controllers/postsRoute/getFollowingPosts");

const postsRoute = express.Router();

postsRoute.get("/following", getFollowingPosts);

exports.postsRoute = postsRoute;
