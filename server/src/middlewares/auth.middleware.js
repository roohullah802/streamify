import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import { User } from '../models/user.model.js'

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) return res.status(400).json({ success: false, message: "Unauthorized! token not provided" })

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        if (!decode) return res.status(400).json({ success: false, message: "Unauthorized! Invalid token" })

        const user = await User.findById({ _id: decode._id }).select("-password")

        if (!user) return res.status(400).json({ success: false, message: "User not found" })

        req.user = user

        next()
    } catch (error) {
        return res.status(500).json({ success: false, message: "Interval server error" })
    }


}