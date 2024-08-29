const express =require("express");
const authRoutes=require("../controller/auth.controller");
const router=express.Router();

router.post("/login",authRoutes.login);

router.post("/signup",authRoutes.signup);

router.post("/logout",authRoutes.logout);

module.exports=router;