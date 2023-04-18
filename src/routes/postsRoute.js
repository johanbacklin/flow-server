const express = require("express");

//Controllers
const { addPost } = require("../controllers/postsRoute/addPost");
const { getFollowingPosts, } = require("../controllers/postsRoute/getFollowingPosts");
const { postGet } = require("../controllers/postsRoute/postGet");
const {updatePost}=require("../controllers/postsRoute/updatePost");

const postsRoute = express.Router();

postsRoute.get("/following", getFollowingPosts);

postsRoute.post("/add", addPost);

postsRoute.get("/:username", postGet);

postsRoute.patch("/", updatePost)

exports.postsRoute = postsRoute;
