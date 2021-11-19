const mongoose = require("mongoose");
const PostSchema = new Schema({
    authorID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    avatarAuthor:{
        type: String
    },
    title:{
        type: String
    },
    description:{
        type:String
    },
    picture:{
        type:String,
        default: ""
    },
    likes:[{type: mongoose.Types.ObjectId, ref:'user'}],
    likeCount:{
        type:Number, 
        required:true
    },
    comments:{
        type:[{
            commenterID: String,
            text: String,
            timestamp: Number
        }],
        required:true
    }
    },{
        timestamps:true
    }
)
module.exports = mongoose.model('post', PostSchema);