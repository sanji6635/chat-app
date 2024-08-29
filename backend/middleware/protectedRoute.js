const jwt=require("jsonwebtoken");
const Usermodel=require("../dbModels/Usermodel");
const dotenv=require("dotenv");
dotenv.config();

const protectedRoute=async(req,res,next)=>{
    try{
        const token=await req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"Unauthorized no token provided"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({error:"Unauthorized no invalid token"});
        }

        const user=await Usermodel.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({error:"Unauthorized invalid user"});
        }

        req.user=user;

        next();
    }catch(err){
        console.log(`error in protectedRoute middleware=> ${err}`);
        res.status(500).json({error:"internal server error"})
    }
}


module.exports=protectedRoute;
