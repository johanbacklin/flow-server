const { db } = require("../../database/database");
const { validatePost } = require("../validations/validatePost")
const {ObjectId}= require("mongodb")

exports.updatePost = function (req, res) {

    const validatedBody = validatePost(req.body)
    if (validatedBody.error) {
        res.status(400).send(validatedBody.error.details[0].message);
        return;
    }
    const { postText, id } = validatedBody.value;
    if(!id){
        res.status(400).send('Please add id for post to edit')
        return;
    }
    
    db.posts.updateOne({_id : new ObjectId(id)},{$set:{postText}})
    .then(result=>{
        if(result.modifiedCount==1){
        res.status(200).send("Update complete")
        }else{
            throw new Error()
        }
    })
        .catch(error=>{
            res.status(500).send('Could not update post');
            return
        })
}


