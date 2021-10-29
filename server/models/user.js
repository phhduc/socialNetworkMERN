
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            min: 3,
            max: 20,
            unique: true
        },
        password:{
            type: String,
            required: true,
            min: 6
        },
        fullname:{
            type: String,
            required:true
        },
        gender:{
            type: Boolean,
            required: true
        },
        birthDate:{
            type: Date,
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
    },{
        timestamps: true
    }
);
module.exports= mongoose.model('user', UserSchema)