require("dotenv").config();
const { db } = require("../../database/database");
const {
  validateUsernamePassword,
} = require("../validations/validateUsernamePassword");
const { createAuthentication } = require("../middleware/createAuthentication");
const { checkHashPassword } = require("../../functions/checkHashPassword");

exports.userLogin = function (request, response) {
  /*
   * This validates the request body that the user has inputted
   */
  const validateBody = validateUsernamePassword(request.body);

  if (validateBody.error) {
    response.status(400).send(validateBody.error.details[0].message);
    return;
  }

  /*
   * This obtains the users current data from the validated result.
   */
  const { username, password } = validateBody.value;

  /*
   * If the user wants to log in, the below query will be made.
   */

  db.users
    .findOne({ username })
    .then(async function (result) {
      if (result === null) {
        return response.status(404).send("Invalid credentials!");
      }
      /*
       * This checks and compares that the stored password and the inputted password are the same
       */
      const validPassword = checkHashPassword(response, result, password);
      if (validPassword) {
        /*
         * If the username and password is correct a copy of the users new information is made and sent through
         * the createAuthentication to create a cookie with the necessary information for other application queries.
         */
        const userCopy = {
          id: result._id.toString(),
          username: result.username,
        };

        createAuthentication(response, userCopy);

        /*
         * The query has been successfully made!
         */
        response.status(200).send({ username });
      }
    })
    .catch(function (error) {
      console.log("Error: ", error);
      return response.status(500).send(error);
    });
};
