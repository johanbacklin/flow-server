const { db } = require("../../database/database");
const { hasPassword } = require("../../functions/hashPassword");
const {
  validateUsernamePassword,
} = require("../validations/validateUsernamePassword");

exports.userRegister = function (request, response) {
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
   * The password is hashed so it can be securely stored in the database by using bcrypt.
   */
  const securePassword = hasPassword(password);

  const newUser = {
    username,
    password: securePassword,
    following: [],
    followers: [],
  };

  /*
   * If the user wants to register, the below query will be made.
   */
  db.users
    .insertOne(newUser)
    .then(function (result) {
      /*
       * The query has been successfully made!
       */
      response.status(201).send(`User: ${username} has been registered!`);
    })
    .catch(function (error) {
      /*
       * This checks that the user has not entered a username that already exists in the database.
       */
      if (error.code === 11000) {
        return response
          .status(409)
          .send(`Username: ${username} already exists!`);
      } else {
        return response.status(500).send(error);
      }
    });
};
