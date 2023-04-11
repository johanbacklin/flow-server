const bcrypt = require("bcrypt");

exports.hasPassword = function (password) {
  /*
   * The password is hashed so it can be securely stored in the database by using bcrypt.
   */
  return bcrypt.hashSync(password, 10);
};
