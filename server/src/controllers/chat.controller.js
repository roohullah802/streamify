import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
    try {
        const token = generateStreamToken(req.user._id)
        if (!token) {
            return res.status(400).json({ success: false, message: "stream token cannot generated!" })
        }

        return res.status(200).json({ success: true, message: "token generated", token })
    } catch (error) {
        return res.status(400).json({ success: false, message: "interval server error!" })
    }
}