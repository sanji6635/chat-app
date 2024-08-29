const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        minlength:6
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true});
const Usermodel=mongoose.model("Users",userSchema,"Users");
module.exports=Usermodel;