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
        res.status(500).json({success:false, message:"internal server error"})
    }
})
router.post('/login', async(req, res)=>{
    const {username, password} = req.body;
    if(!username || !pawword)
    return res.status(400)
    .json({success: false, message: 'missing username and/or password'})
    try{
        const user = await User.findOne({username});
        if(!user)
        return res.status(400).json({success: false, message: "incorrect username or password"})
        const passwordValid = await argon2.verify(user.password, password);
        if(!passwordValid)
        return res.status(400).json({success: false, message: "incorrect username or password"})
        const accessToken = jwt.sign({userId: user._id}, 'serect')
        res.json({success:true,
        message: 'user login successfully', accessToken}
        )
    }catch(error){

    }
})

module.exports = router