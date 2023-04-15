const express = require("express");

//Controllers
const { addPost } = require("../controllers/postsRoute/addPost");
const {
  getFollowingPosts,
} = require("../controllers/postsRoute/getFollowingPosts");
const { postGet } = require("../controllers/postsRoute/postGet");
const { postLike } = require("../controllers/postsRoute/postLike");
const { postLikeDelete } = require("../controllers/postsRoute/postLikeDelete");

const postsRoute = express.Router();

postsRoute.get("/following", getFollowingPosts);

postsRoute.post("/add", addPost);

postsRoute.get("/:username", postGet);

postsRoute.post("/like", postLike);

postsRoute.delete("/like", postLikeDelete);

exports.postsRoute = postsRoute;
