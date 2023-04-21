exports.isLoggedIn = function (request, response) {
  /*
   * This validates that the user does not send in data in the query or body.
   */
  const query = request.query;
  const body = request.body;

  const queryKeys = Object.keys(query);
  const bodyKeys = Object.keys(body);

  if (queryKeys.length > 0 || bodyKeys.length > 0) {
    return response.status(400).send("Please do not send in data");
  }

  const { username } = request.loggedInUser;

  /*
   * If validation is ok the user is logged in
   */

  response.status(200).send({ username });
};
