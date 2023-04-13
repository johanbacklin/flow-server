const joi = require("joi");

exports.validateCookie = function (loggedInUser) {
  const postSchema = joi.object({
    id: joi.string().length(24).required(),
    username: joi.string().min(3).max(50).required(),
    iat: joi.number().required(),
    exp:joi.number().required()
  });

  return postSchema.validate(loggedInUser);
};
