const express = require('express');
const User = require("../models/user")

const router=express.Router();

router.post('/', async (req, res)=>{
    try{
        const usr= await User.find({username:req.body.username}).exec();
        if(usr>0){
            return res.send(`username: ${req.body.username} da ton tai`);
        }
        const newUser = new User({
            username:req.body.username,
            password:req.body.password,
            fullname:req.body.fullname,
            gender:true
        });
        await newUser.save();
        return req.send(json({newUser}))
        
    }catch(err){
        return res.send("loi 2" +err)
    }
})
router.get('/',async(req, res)=>{
    
    const username=req.body.username;
    try{
        const usr = await User.findOne({username})
        const rr = usr._doc;
        req.send(json({rr}));
    }catch(err){
        res.send("error " + username)
    }
})
module.exports = router;