import express from 'express';
import {signup, login, logout, onboard} from '../controllers/auth.controller.js';
import {protectedRoute} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/onboard", protectedRoute, onboard);

export default router;