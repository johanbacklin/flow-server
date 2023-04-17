const { ObjectId } = require("mongodb");
const { db } = require("../../database/database");
const { validateDatabaseID } = require("../validations/validateDatabaseID");

exports.postLikeDelete = function (request, response) {
  /*
   * This validates that the user does not send in data in the query or body.
   */
  const validateBody = validateDatabaseID(request.body);

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
   * If the user wants to get a all posts for a certain user, the following query will be made.
   */
  db.posts
    .updateOne(
      { _id: new ObjectId(postID) },
      {
        $pull: { likes: username },
      }
    )
    .then(function (result) {
      if (result.matchedCount === 0) {
        return response
          .status(404)
          .send(`Cannot find the post username ${username} wants to unlike!`);
      }

      if (result.matchedCount === 1 && result.modifiedCount === 0) {
        return response
          .status(409)
          .send("You have not liked this post and cannot remove a like!");
      }

      /*
       * The query has been successfully made!
       */
      response
        .status(200)
        .send(
          `${username} has successfully removed their like from this post!`
        );
    })
    .catch(function (error) {
      return response.status(500).send(error);
    });
};
