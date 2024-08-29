const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const { app, server } =require( "./socket/socket.js");

const ConnectionToDB=require("./Db/mongoose");

const cookieParser=require("cookie-parser");

const userRoute=require("./routes/user.routes");
const authRoutes=require("./routes/auth.routes");
const messageRoute=require("./routes/messageRoute.routes");

dotenv.config();
const PORT=process.env.PORT || 5000 ;

app.use(cors({
    origin: 'http://localhost:5000', // The origin you want to allow
    credentials: true, // Allow credentials
}));
app.use(express.json());


app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoute);
app.use("/api/user",userRoute);

server.listen(PORT,()=>{
    ConnectionToDB(),
    console.log(`sever is running on the port ${PORT}`)
});
