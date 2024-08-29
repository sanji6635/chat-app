const mongoose=require("mongoose");
const Usermodel=require("../dbModels/Usermodel");
const dotenv=require("dotenv");
dotenv.config();

const ConnectionToDB=async()=>{
    try{
        await mongoose.connect(process.env.URI);
        console.log(`connection is done successfull`);

    }catch(err){
        console.log(`database connection error => ${err}`)
    }
};

module.exports=ConnectionToDB;