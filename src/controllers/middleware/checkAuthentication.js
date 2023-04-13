const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const{validateCookie}=require("../validations/validateCookie")

/*
 * This middleware checks if a user is logged in by checking if a cookie exists containing the user information.
 */
exports.checkAuthentication = function (request, response, next) {
  const authenticationToken = request.cookies.authenticationToken;
  try {
    const loggedInUser = validateCookie(jwt.verify(authenticationToken, secret)).value;
    if (!loggedInUser) {
      throw new Error('Bad cookie, get another one')
    }
    
    request.loggedInUser = loggedInUser;
    next();
  } catch (error) {
    response.status(401).send("Please login to access account settings!");
  }
};
