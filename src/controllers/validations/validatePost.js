const joi = require("joi");

exports.validatePost = function (requestBody) {
  const postSchema = joi.object({
    postText: joi.string().min(3).max(500).required(),
    id: joi.string().length(24).optional()
  });

  return postSchema.validate(requestBody);
};


