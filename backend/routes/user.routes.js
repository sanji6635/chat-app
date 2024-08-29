const express = require("express");
const protectedRoute=require("../middleware/protectedRoute");
const getUsersForSideBar=require("../controller/user.controller");
const router=express.Router();

router.get("/",protectedRoute,getUsersForSideBar);


module.exports=router;


