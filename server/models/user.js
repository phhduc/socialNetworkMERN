const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    avatar: {type: String, default: "http://res.cloudinary.com/dv4dqguu2/image/upload/v1637291457/nrkys74dbxdbda8xx78m.png"},
    followers:[{type:mongoose.Schema.Types.ObjectId, ref: "User"}],
    following:[{type:mongoose.Schema.Types.ObjectId, ref: "User"}]
})
 mongoose.model("User", userSchema)