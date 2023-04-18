const express = require("express");

//Controllers
const { addPost } = require("../controllers/postsRoute/addPost");
const {
  getFollowingPosts,
} = require("../controllers/postsRoute/getFollowingPosts");
const { postGet } = require("../controllers/postsRoute/postGet");
const { postLike } = require("../controllers/postsRoute/postLike");
const { postLikeDelete } = require("../controllers/postsRoute/postLikeDelete");
const {
  checkAuthentication,
} = require("../controllers/middleware/checkAuthentication");

const postsRoute = express.Router();

postsRoute.get("/following", checkAuthentication, getFollowingPosts);

postsRoute.post("/add", checkAuthentication, addPost);

postsRoute.get("/:username", postGet);

postsRoute.post("/like", checkAuthentication, postLike);

postsRoute.delete("/like", checkAuthentication, postLikeDelete);

exports.postsRoute = postsRoute;
