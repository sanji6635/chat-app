const express=require("express");
const protectedRoute=require("../middleware/protectedRoute");
const messageRoute=require("../controller/messsage.controller");
const router=express.Router();

router.get("/:id",protectedRoute,messageRoute.getMessage);
router.post("/send/:id",protectedRoute,messageRoute.sendMessage);


module.exports=router;