import { User } from '../models/user.model.js';
import { FriendRequest } from '../models/friendRequest.model.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { upsertStreamUser } from '../lib/stream.js'




export async function getRecommendedUsers(req, res) {
    const userId = req.user?._id
    const currentUser = req.user


    const recommended = await User.find({
        $and: [
            { _id: { $ne: userId } },
            { $id: { $nin: currentUser?.friends } },
            { isOnBoarded: true }
        ]
    })

    if (!recommended) {
        return res.status(400).json({ success: false, message: "No recommended users!" })
    }

    return res.status(200).json({ success: true, message: "Recommended users", recommended })

}



export async function getMyFriends(req, res) {
    const userId = req.user._id;


    const myFriends = await User.find(userId).populate({
        path: "friends",
        select: "fullname email nativeLanguage learningLanguage"
    })
    const frnds = myFriends.filter(friend => friend._id.toString() !== userId.toString())


    if (!myFriends) {
        return res.status(400).json({ success: false, message: "No friends found!" })
    }


    return res.status(200).json({ success: true, message: "My friends", frnds })
}


export async function sendFriendRequest(req, res) {
    const myId = req.user._id
    const { id: recipientId } = req.params

    if (recipientId === myId) {
        return res.status(400).json({ success: false, message: "you can't send request to yourself!" })
    }


    // check for if the recipient is exist
    const recipient = await User.findById(recipientId)

    if (!recipient) {
        return res.status(400).json({ success: false, message: "recipient not found!" })
    }


    // check for if myId is exist in recipient friends array or not
    if (recipient?.friends?.includes(myId)) {
        return res.status(400).json({ success: false, message: "you already friend with this user" })
    }

    // check for if the request does exist or not
    const existingRequest = await FriendRequest.findOne({
        $or: [
            { sender: myId, recipient: recipientId },
            { sender: recipientId, recipient: myId }
        ]
    })

    if (existingRequest) {
        return res.status(400).json({ success: false, message: "you already have request for this user" })
    }

    const friendRequest = await FriendRequest.create({
        sender: myId,
        recipient: recipientId
    })

    if (!friendRequest) {
        return res.status(400).json({ success: false, message: "friend request failed!" })
    }

    return res.status(200).json({ success: true, message: "friend request successfully sent" })
}



export async function acceptFriendRequests(req, res) {
    const myId = req.user._id;
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId)

    if (!friendRequest) {
        return res.status(400).json({ success: false, message: "friend request not found!" })
    }

    if (friendRequest?.recipient?.toString() !== myId.toString()) {
        return res.status(400).json({ success: false, message: "you are not authorized! to accept this friend request" })
    }

    const senderId = friendRequest.sender;
    const receiverId = friendRequest.recipient;

    await User.findByIdAndUpdate(senderId, {
        $addToSet: { friends: receiverId }
    })

    await User.findByIdAndUpdate(receiverId, {
        $addToSet: { recipient: senderId }
    })

    await FriendRequest.findByIdAndDelete(requestId)


    return res.status(200).json({ success: true, message: "friend request successfully accepted" })

}


export async function getFriendRequests(req, res) {
    try {
        const incomingReqs = await FriendRequest.find({
            recipient: req.user._id,
            status: "pending"
        }).populate("sender", "fullname profilePic nativeLanguage learningLanguage")


        const acceptReqs = await FriendRequest.find({
            sender: req.user._id,
            status: "accepted"
        }).populate("recipient", "fullname profilePic")

        return res.status(200).json({ success: true, message: "here is incoming and accepted requests", incomingReqs, acceptReqs })

    } catch (error) {
        return res.status(500).json({ success: false, message: "interval server error!" })
    }
}



export async function outGoingFriendReqs(req, res) {
    try {
        const outGoingReqs = await FriendRequest.find({
            sender: req.user._id,
            status: "pending"
        }).populate("recipient", "fullname profilePic nativeLanguage learningLanguage")
        if (!outGoingReqs) {
            return res.status(400).json({ success: false, message: "no out going requests" })
        }

        return res.status(200).json({ success: true, message: "out going requests", outGoingReqs })
    } catch (error) {
        return res.status(500).json({ success: false, message: "interval server error!" })
    }
}