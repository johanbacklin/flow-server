const { ObjectId } = require("mongodb");
const { db } = require("../../database/database");

exports.deletePost = async function (request, response) {
  try {
    const { id } = request.body;
    const { username } = request.loggedInUser;

    if (!ObjectId.isValid(id)) {
      return response.status(400).send("Invalid post id");
    }

    const result = await db.posts.deleteOne({
      _id: new ObjectId(id),
      username,
    });

    if (result.deletedCount === 1) {
      response.status(200).send("Successfully deleted post");
    } else {
      response.status(404).send("Could not find post");
    }
  } catch (err) {
    response
      .status(500)
      .json({ error: "Internal server error: could not delete post" });
  }
};
