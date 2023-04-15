const joi = require("joi");

exports.validateIdUsername = function (requestBody) {
  const postSchema = joi.object({
    id: joi.string().length(24).hex().required(),
    username: joi.string().min(3).max(50).required(),
  });

  return postSchema.validate(requestBody);
};
