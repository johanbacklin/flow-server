const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

/*
 * This middleware creates a cookie containing the logged in user information.
 */
exports.createAuthentication = function (response, userCopy) {
  const authenticationToken = jwt.sign(userCopy, secret, {
    expiresIn: 600,
  });

  response.cookie("authenticationToken", authenticationToken, {
    maxAge: 600000,
    sameSite: "none",
    // secure: true,
    httpOnly: true,
  });
};
