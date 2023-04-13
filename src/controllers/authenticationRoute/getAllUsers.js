const { db } = require("../../database/database");

exports.getAllUsers = async function (request, response) {
  try {
    const usernames = await db.users.distinct("username");

    if (!Array.isArray(usernames)) {
      return response
        .status(500)
        .json({ error: "Internal server error: could not retrieve users" });
    }

    if (usernames.length === 0) {
      return response.status(500).json({ error: "No users where found" });
    }

    response
      .status(200)
      .json({ usernames, message: "Successfully retrieved all users" });
  } catch (err) {
    console.log(err);
    response
      .status(500)
      .json({ error: "Internal server error: could not retrieve users" });
  }
};
