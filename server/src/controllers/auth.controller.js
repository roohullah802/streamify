import { User } from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export function homepage(req, res) {
    res.send("helloo world!")
}



export async function signup(req, res) {
    const { fullname, email, password } = req.body

    if (!fullname || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required!" })
    }

    if (password.length < 6) {
        return res.status(400).json({ success: false, message: "password must be atleast 6 characters" })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(401).json({
            success: false,
            message: "User email already exist, please use a different one"
        })
    }

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomPic = `https://avatar.iran.liara.run/public/${idx}`

    const newUser = await User.create({
        fullname,
        email,
        password,
        profilePic: randomPic
    })

    await newUser.save()

    if (!newUser) {
        return res.status(400).json({ message: "User not created!" })
    }

    res.status(200).json({ success: true, message: "user created successfully" })


}




export async function login(req, res) {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "all fields are required" })
    }

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: "user not found" })
    }

    const isPass = await user.checkPassword(password)
    if (!isPass)  return res.status(400).json({success: false, message:"invalid user credientials"})


    const token = jwt.sign({
        _id: user._id,
        password: user.password,
        email: user.email
    }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in ms
    })

    return res.status(200).json({ message: "user Logged in successfully" })
}


export async function logout(req, res) {
    res.clearCookie("token")
    res.status(200).json({success: true, message:"user logout successfully"})
} 
