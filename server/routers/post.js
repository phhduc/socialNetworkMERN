const express = require('express')
const router = express.Router();

const Post = require("../models/post")


router.post('/', async(req, res)=>{
    const {title, description, picture} =req.body;
    try{
        const newPost = new Post({,title, description, picture});
    } catch(error){

    }
})