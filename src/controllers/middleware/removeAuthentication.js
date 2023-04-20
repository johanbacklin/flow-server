/*
 * This middleware removes a cookie containing the logged in user information.
 */
exports.removeAuthentication = function (request, response) {
  const authenticationToken = request.cookies.authenticationToken;

  response.cookie("authenticationToken", authenticationToken, {
    maxAge: 0,
    sameSite: "none",
    // secure: true,
    httpOnly: true,
  });
};
