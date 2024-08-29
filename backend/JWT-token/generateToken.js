const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();
const generateTokenAndSetCookie=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"15d"
    });
    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true, //prevent XSS attacks
        sameSite:"strict" //prevent cross site request forgery
    })
};

module.exports=generateTokenAndSetCookie;