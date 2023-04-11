const bcrypt = require("bcrypt");

exports.checkHashPassword = function (response, result, password, next) {
  const storedPassword = result.password;
  const isEqual = bcrypt.compareSync(password, storedPassword);

  if (!isEqual) {
    response.status(404).send("Invalid credentials!");
    return false;
  }
  return true;
};
