const { db } = require("../../database/database");
require("dotenv").config();
const { validateFollow } = require("../validations/validateFollow");
const { ObjectId } = require("mongodb");

exports.followUser = async function (req, res) {
  const validatedBody = validateFollow(req.body);

  if (validatedBody.error) {
    res.status(400).send(validatedBody.error.details[0].message);
    return;
  }

  if (req.body._id !== req.loggedInUser.id) {
    try {
      const userToFollow = await db.users.findOne({
        _id: new ObjectId(req.body._id),
      });
      if (userToFollow.following.includes(req.loggedInUser.username)) {
        return res.status(403).json("You are already following this user");
      } else {
        await db.users.updateOne(
          { _id: new ObjectId(req.body._id) },
          { $push: { following: req.loggedInUser.username } }
        );
        await db.users.updateOne(
          { _id: new ObjectId(req.loggedInUser.id) },
          { $push: { followers: userToFollow.username } }
        );
        res.status(200).json("User has been followed");
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  } else {
    return res.status(400).json("You can't follow yourself");
  }
};
