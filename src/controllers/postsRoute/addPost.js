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
        //creation:new Date(<integer>)
    }
    db.posts.insertOne(newPost)
        .then(result => {
            console.log(result)
        //    if(result.insertedID)
            res.status(200).send('reached addPost')
        })
        .catch(error=>{
            response.status(500).send('Ooops, something went wrong');
            return
        })


    
}

//posts (postText, username, creation - date?), likes[], comment [(commentTex, username, creation - date)]