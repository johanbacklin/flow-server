const { ObjectId } = require("mongodb");
const { db } = require("../../database/database");
const { validateComment } = require("../validations/validateComment");

exports.addComment = async function (request, response) {
  try {
    const { username } = request.loggedInUser;

    const validatedBody = validateComment(request.body);

    if (validatedBody.error) {
      response.status(400).send(validatedBody.error.details[0].message);
      return;
    }

    const { commentText, postID } = validatedBody.value;

    const result = await db.posts.updateOne(
      { _id: new ObjectId(postID) },
      {
        $push: {
          comments: {
            username: username,
            comment: commentText,
          },
        },
      }
    );

    if (result.matchedCount === 0) {
      response.status(404).json({ error: "Post not found" });
      return;
    }

    response.status(200).json(result);
  } catch (error) {
    response
      .status(500)
      .json({ error: "Internal server error: could not add comment" });
  }
};
