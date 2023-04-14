const { ObjectId } = require("mongodb");
const { db } = require("../../database/database");

exports.deletePost = async function (request, response) {
  const { id } = request.body;
  const {username} = request.loggedInUser
  console.log("🚀 ~ file: deletePost.js:5 ~ exports.deletePost ~ id:", id)
//validate
  try {
    const result = await db.posts.deleteOne({ _id: new ObjectId(id), username });
    response.json(result);
  } catch (err) {
    console.log(err);
    response
      .status(500)
      .json({ error: "Internal server error: could not delete post" });
  }
};
