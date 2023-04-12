const express = require("express");

const postsRoute = express.Router();

postsRoute.get("/",(req,res)=>{
    res.status(200).send('Not implemented yet')
})


exports.postsRoute= postsRoute;
