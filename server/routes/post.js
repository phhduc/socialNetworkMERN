const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")

// all Post
router.get('/allpost',requireLogin, (req, res) =>{
    Post.find().sort({_id:-1}).limit(100)
    .populate("postBy", "_id name avatar")
    .populate("comments.postBy", "_id name avatar")
    .sort('-createdAt')
    .then(posts => {
        res.json({posts})
    })
    .catch(err=>console.log(err))
})

//api post of follow
router.get('/followpost',requireLogin, (req, res) =>{
    Post.find({postBy:{$in:req.user.following}}).sort({_id:-1}).limit(100)
    .populate("postBy", "_id name avatar")
    .populate("comments.postBy", "_id name avatar")
    .then(posts => {
        res.json({posts})
    })
    .catch(err=>console.log(err))
})


// createPost
router.post('/createPost', requireLogin,(req, res) => {
    const {title, body, pic} = req.body;
    if(!title || !body){
        return res.status(400).json({
            error: "Trống tiêu đề hoặc nội dung"
        })
    }
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo:pic,
        postBy: req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch (err => console.log(err))
})
// myPost
router.get('/mypost', requireLogin, (req, res)=>{
    Post.find({postBy:req.user._id})
    .then(myPost=>{
        res.json({myPost})
    })
    .catch(err =>console.log(err))
})


// api like
router.put('/like', requireLogin, (req, res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            res.status(400).json({error:err})
        } else {
            res.json(result)
        }
    })
})
//api unlike
router.put('/unlike', requireLogin, (req, res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            res.status(400).json({error:err})
        } else {
            res.json(result)
        }
    })
})
// api comment

router.put('/comments', requireLogin, (req, res) =>{
    const comment = {
        text:req.body.text,
        postBy: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push: {comments: comment}
    }, {
        new:true
    })
    .populate("comments.postBy", "_id name")
    .populate("postBy","_id name")
    .exec((err, result)=>{
        if(err){
            res.status(400).json({error: err})
        }
        else {
            res.json(result)
        }
    })
})
// api delete post
router.delete('/delpost/:postId', requireLogin, (req, res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postBy", "_id")
    .exec((err, post)=>{
        if(err || !post){
            return res.status(400).json({error: err})
        }
        if(post.postBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result =>{
                res.json(result)
            })
            .catch(err => console.log(err))
        }
    })
})

module.exports = router;