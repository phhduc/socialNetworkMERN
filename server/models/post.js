const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    body:{
        type: String,
        required:true
    },
    photo:{
        type:String,
        default: "no photo"
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    comments:[{
        text:String,
        postBy:{ type: mongoose.Schema.Types.ObjectId, ref:"User" }
    }],
    postBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})
mongoose.model("Post", postSchema)