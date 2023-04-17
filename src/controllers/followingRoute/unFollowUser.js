const { db } = require("../../database/database");
const { validateFollow } = require("../validations/validateFollow");

exports.unFollowUser = async function (req, res) {
  const validatedBody = validateFollow(req.body);

  if (validatedBody.error) {
    res.status(400).send(validatedBody.error.details[0].message);
    return;
  }

  if (req.body.username === req.loggedInUser.username) {
    return res.status(400).json("You cannot unfollow yourself");
  }

  try {
    const userToUnfollow = await db.users.findOne({
      username: req.body.username,
    });

    if (!userToUnfollow) {
      return res.status(404).json("User not found");
    }

    if (!userToUnfollow.followers.includes(req.loggedInUser.username)) {
      return res.status(403).json("You are not following this user");
    }

    const update = [
      {
        updateOne: {
          filter: { username: req.body.username },
          update: { $pull: { followers: req.loggedInUser.username } },
        },
      },
      {
        updateOne: {
          filter: { username: req.loggedInUser.username },
          update: { $pull: { following: req.body.username } },
        },
      },
    ];

    const result = await db.users.bulkWrite(update);

    if (result.modifiedCount === 0) {
      return res.status(404).json("User not found");
    }

    return res.status(200).json("User has been unfollowed");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
