const joi = require("joi");

exports.validateComment = function (requestBody) {
  const postSchema = joi.object({
    commentText: joi.string().min(1).max(200).required(),
    postID: joi.string().length(24).hex().required(),
  });

  return postSchema.validate(requestBody);
};
