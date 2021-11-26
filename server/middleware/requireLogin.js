const jwt = require('jsonwebtoken')
require('dotenv').config()
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = (req, res, next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        res.status(401).json({error: "you must be logged"})
    }
    const token = authorization
    jwt.verify(token, process.env.JWT_SECRET, (err, payload)=>{
        if(err){
            return res.status(401).json({error: "you must be logged"})
        }
        const {_id} = payload;
        User.findById(_id).then(userdata =>{
            req.user = userdata
            next();
        })
    })
}