const { db } = require("../../database/database");
const { validatePost } = require("../validations/validatePost")

exports.addPost = function (req, res) {

    const validatedBody = validatePost(req.body)
    if (validatedBody.error) {
        response.status(400).send(validatedBody.error.details[0].message);
        return;
    }
    const { postText } = validatedBody.value;

    const newPost = {
        username: req.loggedInUser,
        postText,
        likes: [],
        comments: [],
        $setOnInsert: { creation: new Date() }
    }
    db.posts.insertOne(newPost)
        .then(result => {
            if(result.insertedId){
            res.status(200).send('Post inserted')
            }else{
                throw new Error('Could not insert post')
            }
        })
        .catch(error=>{
            response.status(500).send('Ooops, something went wrong');
            return
        })
}

