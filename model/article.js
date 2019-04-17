const mongoose = require("mongoose")
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title : String,
    times:String,
    content : String,//存储富文本
    contentText:String,//存储纯文本
    category:[
        {
            ref:"category",
            type:Schema.Types.ObjectId,
            required: true
        }
    ],
    author:{
        ref: "user",
        // type:Schema.Types.ObjectId
        type :String
    },
    looksnum:{
        type:Number,
        default:0
    },
    commons:[{
        ref:"common",
        type: Schema.Types.ObjectId
    }]
},{
    versionKey:false,
    timestamps:{createdAt:"createTime",updatedAt:"updateTime"}
})

module.exports = mongoose.model("article",articleSchema)