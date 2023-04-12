const express = require("express");

const { followUser } = require("../controllers/followingRoute/followUser");
const { unFollowUser } = require("../controllers/followingRoute/unFollowUser");

const followingRoute = express.Router();
/*
 * This route makes it possible for users to follow other users.
 */

followingRoute.post("/follow", followUser);
/*
 * This route makes it possible for users to unFollow other users.
 */
followingRoute.post("/unFollow", unFollowUser);

exports.followingRoute = followingRoute;
