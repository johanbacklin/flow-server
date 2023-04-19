const joi = require("joi");

exports.validatePostID = function (requestBody) {
  const postSchema = joi.object({
    id: joi.string().length(24).hex().required(),
  });

  return postSchema.validate(requestBody);
};
