const joi = require("joi");

exports.validateFollow = function (requestBody) {
  const followSchema = joi.object({
    username: joi.string().required(),
    _id: joi.string().required(),
  });

  return followSchema.validate(requestBody);
};
