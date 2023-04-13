const express = require("express");

//Middlewares
const{checkAuthentication }=require("../controllers/middleware/checkAuthentication")
//Controllers
const {addPost}=require("../controllers/postsRoute/addPost")
const {
  getFollowingPosts,
} = require("../controllers/postsRoute/getFollowingPosts");

const postsRoute = express.Router();

postsRoute.use(checkAuthentication )

postsRoute.get("/following", getFollowingPosts);
postsRoute.post('/add', addPost)

exports.postsRoute= postsRoute;

