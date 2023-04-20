const { db } = require("../../database/database");
const { validateUsername } = require("../validations/validateUsername");

exports.postGet = async function (request, response) {
  /*
   * This validates that the user does not send in data in the query or body.
   */
  const query = request.query;
  const body = request.body;

  const queryKeys = Object.keys(query);
  const bodyKeys = Object.keys(body);

  if (queryKeys.length > 0 || bodyKeys.length > 0) {
    response.status(400).send("Please do not send in data");
    return;
  }

  /*
   * This validates that the value the user puts into the params.
   */
  const validationResult = validateUsername(request.params);

  if (validationResult.error) {
    return response.status(400).send(validationResult.error.details[0].message);
  }

  const { username } = validationResult.value;

  /*
   * If the user wants to get a all posts for a certain user, the following query will be made.
   */
  db.posts
    .find({ username })
    .toArray()
    .then(async function (result) {
      if (result.length === 0) {
        return response
          .status(404)
          .send(`${username}, have not posted anything yet!`);
      }

      /*
       * The query has been successfully made!
       */
      response.status(200).json(result);
    })
    .catch(function (error) {
      return response.status(500).send(error);
    });
};
