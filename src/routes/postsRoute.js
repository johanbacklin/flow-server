const express = require("express");
//Middlewares
const{checkAuthentication }=require("../controllers/middleware/checkAuthentication")
//Controllers
const {addPost}=require("../controllers/postsRoute/addPost")

const postsRoute = express.Router();

postsRoute.use(checkAuthentication )

postsRoute.get("/",(req,res)=>{
    res.status(200).send('Not implemented yet')
})


postsRoute.post('/add', addPost)

exports.postsRoute= postsRoute;
