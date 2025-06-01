import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import userAuth from './src/routers/auth.router.js';
import userRouter from './src/routers/user.router.js'
import homeAuth from './src/routers/home.router.js';
import chatRouter from './src/routers/chat.router.js'
import {connectDB} from './src/db/connectDB.js';
const PORT = process.env.PORT;
const app = express();



app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use("/", homeAuth)
app.use("/user/auth",userAuth)
app.use("/user", userRouter)
app.use("/chat", chatRouter)


app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
    connectDB()
})