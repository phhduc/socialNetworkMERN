const express = require('express')
const router = express.Router();
const mongoose = require("mongoose")
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/requireLogin')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))
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
        return res.status(422).json({ error: "Vui lòng điền đủ thông tin" })
    }
    User.findOne({ email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(400).json({ error: "Email đã tồn tại" })
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
                            res.json({ message: "Tạo tài khoản thành công" })
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
        res.status(422).json({error: "Vui lòng không để trống mật khẩu"})
    }
    User.findOne({email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(400).json({error: "Sai email hoặc mật khẩu"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(mathPass => {
            if(mathPass){
                const token = jwt.sign({_id:savedUser._id}, process.env.JWT_SECRET)
                const {_id, name, email, followers, following, avatar} = savedUser;
                res.json({token, user:{_id,name,email,followers,following, avatar}})
            }
            else{
                return res.status(400).json({error: "Sai email hoặc mật khẩu"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>console.log(err))
})

router.post('/reset-password', (req,res) => {
    crypto.randomBytes(32,(err,buffer)=>
    {
        if(err)
        {
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user)
            {
                return res.status(422).json({error:"Không tồn tại email này"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"no-reply@socialnetwork.com",
                    subject:"password reset",
                    html:`
                    <p>Bạn đã yêu cầu khôi phục mật khẩu</p>
                    <h5>Nhấn vào đây <a href="http://localhost:3000/reset/${token}">Link</a> để khôi phục mật khẩu</h5>
                    `
                })
                res.json({message:"Hãy kiểm tra email của bạn"})
            })
        })
    })
})

module.exports = router;