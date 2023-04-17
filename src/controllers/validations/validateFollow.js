const joi = require("joi");

exports.validateFollow = function (requestBody) {
  const followSchema = joi.object({
    username: joi.string().min(3).max(50).required(),
  });

  return followSchema.validate(requestBody);
};
