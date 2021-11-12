const express = require('express')
const User = require('../models/user')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const router=express.Router()

router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    try{
        const user = await User.findOne({username})
        if(user)
        return res.status(400).json({success: false, message: 'username already taken'})
        const hashPassword = await argon2.hash(password)
        const newUser = new User({
            username, password: hashPassword, gender: true
        })
        await newUser.save();
        const accessToken = jwt.sign({userId: newUser._id}, 'serect')
        
        res.json({success:true,
        message: 'user create successfully', accessToken}
        )
    } catch(err){
        console.log(err)
    }
})

module.exports = router