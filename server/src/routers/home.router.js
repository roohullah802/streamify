import express from 'express'
import {homepage} from '../controllers/auth.controller.js'

const router = express.Router()

router.get("/", homepage)

export default router