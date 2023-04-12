const { db } = require("../../database/database");

exports.getFollowingPosts = async function (request, response) {
  try {
    const { username } = request.loggedInUser;

    const user = await db.users.findOne({ username: username });

    const { following } = user;

    if (!Array.isArray(following)) {
      return response.status(400).json({ error: "Invalid input data" });
    }

    const posts = await db.posts
      .find({ username: { $in: following } })
      .sort({ createdAt: -1 }) // sort by createdAt in descending order
      .limit(10) //retrieve only the 10 most recent posts
      .toArray();

    response.status(200).json(posts);
  } catch (err) {
    console.log(err);
    response.sendStatus(500);
  }
};
