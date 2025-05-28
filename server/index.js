import express from "express"
import dotenv from "dotenv"
dotenv.config()
import userAuth from './src/routers/auth.router.js'
import homeAuth from './src/routers/home.router.js'
import {connectDB} from './src/db/connectDB.js'
const PORT = process.env.PORT
const app = express()



app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/", homeAuth)
app.use("/user/auth",userAuth)


app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
    connectDB()
})