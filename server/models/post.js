const mongoose = require("mongoose");
const PostShema = new Schema({
    authorID:{
        type: String,
        reqired:true
    },
    avatarAuthor:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    picture:{
        type:[String],
        default: []
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