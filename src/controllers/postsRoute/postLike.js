const { ObjectId } = require("mongodb");
const { db } = require("../../database/database");
const { validatePostID } = require("../validations/validatePostID");

exports.postLike = function (request, response) {
  /*
   * This validates that the user does not send in data in the query or body.
   */
  const validateBody = validatePostID(request.body);

  if (validateBody.error) {
    response.status(400).send(validateBody.error.details[0].message);
    return;
  }

  /*
   * This obtains the users current data stored in the cookie and the data from the validated result.
   */
  const postID = validateBody.value.id;
  const { username } = request.loggedInUser;

  /*
   * If the user wants to like a post, the following query will be made..
   */
  db.posts
    .updateOne(
      { _id: new ObjectId(postID) },
      {
        $addToSet: { likes: username },
      }
    )
    .then(function (result) {
      if (result.matchedCount === 0) {
        return response
          .status(404)
          .send(`Cannot find the post username ${username} wants to like!`);
      }

      if (result.matchedCount === 1 && result.modifiedCount === 0) {
        return response
          .status(409)
          .send("You cannot like a post more than once!");
      }

      /*
       * The query has been successfully made!
       */
      response
        .status(200)
        .send(`${username} has successfully liked this post!`);
    })
    .catch(function (error) {
      return response.status(500).send(error);
    });
};
