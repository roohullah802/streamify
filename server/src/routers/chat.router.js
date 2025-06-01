import express from 'express';
import {protectedRoute} from '../middlewares/auth.middleware.js'
import {getStreamToken} from '../controllers/chat.controller.js'

const router = express.Router()

router.use(protectedRoute)

router.get("/get-stream-token", getStreamToken)

export default router