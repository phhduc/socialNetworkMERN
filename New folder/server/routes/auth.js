const express = require('express')
const router = express.Router();
const mongoose = require("mongoose")
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/requireLogin')
require('dotenv').config();

//route / public
router.get('/',(req, res) => {
    res.send("OK")
})
// route /api/protected


//route /api/signup public post
router.post('/signup', (req, res) => {
    const { name, email, password, avatar } = req.body;
    if (!email || !password || !name) {
        return res.status(422).json({ error: "please ad all the fields" })
    }
    User.findOne({ email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(400).json({ error: "user already exists with email" })
            }
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email,
                        password:hashedPassword,
                        name,
                        avatar
                    })
                    user.save()
                        .then(user => {
                            res.json({ message: "saved successfully" })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })

        })
        .catch(err => {
            console.log(err)
        })
})


//route /api/singin
router.post('/signin', (req, res) =>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(422).json({error: "please fill email or password"})
    }
    User.findOne({email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(400).json({error: "sai email and/or pass"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(mathPass => {
            if(mathPass){
                const token = jwt.sign({_id:savedUser._id}, process.env.JWT_SECRET)
                const {_id, name, email, followers, following, avatar} = savedUser;
                res.json({token, user:{_id,name,email,followers,following, avatar}})
            }
            else{
                return res.status(400).json({error: "sai email or/and pass"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>console.log(err))
})

module.exports = router;