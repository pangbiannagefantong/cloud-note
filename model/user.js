const mongoose = require("mongoose")
const Schema = mongoose.Schema


const userSchema = new Schema({//定义用户的数据结构
    name : String,
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true
     }, 
    avatar:{
        type: String,
        // default:"C:\Users\Administrator\Desktop\cloud note\note\public\images\avatar1.jpg"
    }
},{
    versionKey: false,
    timestamps:{createdAt:"createTime",updatedAt:"updateTime"}
})

module.exports = mongoose.model("user",userSchema)