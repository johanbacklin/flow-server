const express = require("express");
const {
  userRegister,
} = require("../controllers/authenticationRoute/userRegister");

const { userLogin } = require("../controllers/authenticationRoute/userLogin");

const authenticationRoute = express.Router();

/*
 * This route makes it possible for a user to log in to this application.
 */
authenticationRoute.post("/login", userLogin);

/*
 * This route makes it possible for a user to register another user to this application.
 */
authenticationRoute.post("/register", userRegister);

exports.authenticationRoute = authenticationRoute;
