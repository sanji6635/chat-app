const mongoose=require("mongoose");
const messageSchema=new mongoose.Schema({
    sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    receiver_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    message:{
        type:String,
        required:true,
    }
    //createdAt updatedAt will be created by timestamp
},{timestamps:true});

const messageModel=mongoose.model("Message",messageSchema,"Message");
module.exports=messageModel;