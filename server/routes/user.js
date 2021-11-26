// require
const express = require('express')
const mongoose = require('mongoose')

//middleware
const requireLogin = require('../middleware/requireLogin')
//model
const User = mongoose.model("User")
const Post = mongoose.model("Post")

// router
const router = express.Router()

// api get user
router.get('/user/:id', requireLogin, (req, res) => {
    User.findOne({ _id: req.params.id })
        .select("-password")
        .then(user => {
            Post.find({ postBy: req.params.id })
                .populate("postBy", "_id name")
                .exec((err, posts) => {
                    if (err) {
                        return res.status(422).json({ error: err })
                    }
                    res.json({ user, posts })
                })
        }).catch(err => {
            return res.status(404).json({ error: "Không tìm thấy người dùng" })
        })
})
// api follow
router.put('/follow', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.followid, {
        $push: { followers: req.user._id }
    }, { new: true }
    ).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        User.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followid }
        }, { new: true }
        ).select("-password").exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            res.json(result)
        })
    })
})
// api unfollow
router.put('/unfollow', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.followid, {
        $pull: { followers: req.user._id }
    }, { new: true }
    ).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        User.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.body.followid }
        }, { new: true }
        ).select("-password").exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            res.json(result)
        })
    })
})
//api change password
router.put('/changepass', requireLogin, (req, res)=>{
    User.findByIdAndUpdate(req.user._id, {password: req.body.newPass})
    .select("-password")
    .exec((err, result)=>{
        if(err){
            return res.status(422).json({error: err})
        }
        res.json(result)
    })
})

//api change info
router.put('/changeinfo', requireLogin, (req, res)=>{
    User.findByIdAndUpdate(req.user._id, req.body.update)
    .select("-password")
    .exec((err, result)=>{
        if(err){
            return res.status(422).json({error: err})
        }
        return res.json(result)
    })
})

// exports
module.exports = router