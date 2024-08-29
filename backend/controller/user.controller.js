const Usermodel = require("../dbModels/Usermodel");

const getUsersForSideBar=async(req,res)=>{
    try{
        const loggedInUser=req.user._id;
        const allUsers=await Usermodel.find({_id:{$ne:loggedInUser}}).select("-password");

        res.status(200).json(allUsers);
    }catch(err){
        console.log(`error in getUsersForSideBar controller =>${err}`);
        res.status(500).json({error:"Internal server error"});
    }
}

module.exports=getUsersForSideBar;