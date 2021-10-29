const express = require('express');
const user = require("../models/user")

const router=express.Router();

router.post('/', async (req, res)=>{
    try{
        const usr= await user.find({username:req.body.username}).exec();
        if(usr.length>0){
            return res.send(`username: ${req.body.username} da ton tai`);
        }
        const newUser = new user({
            username:req.body.username,
            password:req.body.password,
            fullname:req.body.fullname,
            gender:true
        });
        return newUser
        .save()
        .then(result=>{
            res.send(json({result}));
        })
        .catch(err=>{
            return res.send("loi " + err);
        })
        
    }catch(err){
        return res.send("loi " +err)
    }
})
router.get('/',async(req, res)=>{
    const userId = req.query.userId;
    const username=req.query.username;
    try{
        const usr = userID?await user.findById(userId)
        : await user.findOne({username: username});
        const rr = usr._doc;
        res.send(json(rr));
    }catch(err){
        res.send("error")
    }
})
module.exports = router;