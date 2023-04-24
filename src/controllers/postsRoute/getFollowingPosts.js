const { db } = require("../../database/database");

exports.getFollowingPosts = async function (request, response) {
  try {
    const { username } = request.loggedInUser;

    if (!username) {
      return response
        .status(500)
        .json({ error: "Invalid request: missing username" });
    }

    const user = await db.users.findOne({ username: username });

    const { following } = user;

    if (!Array.isArray(following)) {
      return response
        .status(500)
        .json({ error: "Invalid input data from database" });
    }

    const posts = await db.posts
      .find({
        username: { $in: following },
        creation: { $gt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) }, //retrieve only recent posts that are no older than 5 days
      })
      .sort({ creation: -1 }) // sort by createdAt in descending order
      .toArray();

    if (posts.length === 0) {
      return response.status(404).json({ error: "No posts found" });
    }

    response
      .status(200)
      .json({ posts, message: "Successfully retrieved following posts" });
  } catch (err) {
    console.log(err);
    response.status(500).json({
      error: "Internal server error: could not retrieve following posts",
    });
  }
};
