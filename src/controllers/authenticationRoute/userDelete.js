const { ObjectId } = require("mongodb");
const { removeAuthentication } = require("../middleware/removeAuthentication");
const { validateIdUsername } = require("../validations/validateIdUsername");
const { db } = require("../../database/database");

exports.userDelete = function (request, response) {
  /*
   * This validates the request body that the user has inputted
   */
  const validateBody = validateIdUsername(request.body);

  if (validateBody.error) {
    response.status(400).send(validateBody.error.details[0].message);
    return;
  }

  /*
   * This obtains the users current data from the validated result.
   */
  const { id, username } = validateBody.value;

  const currentUsername = request.loggedInUser.username;
  const currentUserID = request.loggedInUser.id;

  if (id === currentUserID && username === currentUsername) {
    /*
     * If the user wish to delete their account, the following query will be made.
     */
    db.users
      .bulkWrite([
        {
          updateMany: {
            filter: { following: username },
            update: { $pull: { following: username } },
          },
        },
        {
          updateMany: {
            filter: { followers: username },
            update: { $pull: { followers: username } },
          },
        },
        { deleteOne: { filter: { username } } },
      ])
      .then(function (result) {
        /*
         * This removes the cookie from the client side so the user information is not visibly
         * stored and the different pages will not think that the user is still logged in.
         */

        if (result.deletedCount === 0) {
          return response
            .status(404)
            .send("User not found, deletion is not completed!");
        }

        removeAuthentication(request, response);

        db.posts
          .bulkWrite([
            {
              updateMany: {
                filter: { likes: username },
                update: { $pull: { likes: username } },
              },
            },
            {
              updateMany: {
                filter: { "comments.username": username },
                update: { $pull: { comments: { username } } },
              },
            },
            {
              deleteMany: {
                filter: { username },
              },
            },
          ])
          .then(function (result) {
            /*
             * The query has been successfully made!
             */
            response
              .status(200)
              .send(
                `User: ${username} has been deleted from this application and all their related posts, comments and likes!`
              );
          });
      })
      .catch(function (error) {
        console.log("Error: ", error);
        return response.status(500).send(error);
      });
  } else {
    return response
      .status(400)
      .send(`The inputted ${username} does not match the logged in username!`);
  }
};
