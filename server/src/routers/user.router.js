import express from 'express';
import {getMyFriends, getRecommendedUsers, sendFriendRequest, acceptFriendRequests, getFriendRequests, outGoingFriendReqs} from '../controllers/user.controller.js';
import {protectedRoute} from '../middlewares/auth.middleware.js'

const router = express.Router()

router.use(protectedRoute)
router.get("/", getMyFriends)
router.get("/recommended", getRecommendedUsers)
router.post("/friend-request/:id", sendFriendRequest)
router.post("/accept-friend-request/:id", acceptFriendRequests)
router.post("/get-friend-request", getFriendRequests)
router.post("out-going-friend-request", outGoingFriendReqs)

export default router