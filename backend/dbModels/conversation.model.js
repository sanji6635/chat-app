const mongoose=require("mongoose");
const conversationSchema=new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
    }],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
        default:[]
    }]
    //createdAt updatedAt will be created by timestamp
},{timestamps:true});

const conversationModel=mongoose.model("Conversation",conversationSchema,"Conversation");
module.exports=conversationModel;