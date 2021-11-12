
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            require: true,
            unique: true
        },
        password:{
            type: String,
            require: true,
            min: 6
        },
        fullname:{
            require: true,
            type: String
        },
        gender:{
            type: Boolean
        },
        birthDate:{
            type: Date,
            default: Date.now
        },
        avatar:{
            type: String,
            default : ""
        },
        coverPicture:{
            type: String,
            default: ""
        },
        story:{
            type: String,
            default: "",
            maxlength: 5000
        },
        following:[{type:mongoose.Types.ObjectId,ref:'user'}], 
        followers:[{type:mongoose.Types.ObjectId,ref:'user'}], 
        friends:[{type:mongoose.Types.ObjectId, ref:'user'}]
    }
);
module.exports= mongoose.model('user', UserSchema)