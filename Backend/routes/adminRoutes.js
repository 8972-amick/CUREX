import express from 'express';
import { getDoctors, verifyDoctor } from '../controllers/adminControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/doctors', authMiddleware, getDoctors);
router.put('/doctors/:id/verify', authMiddleware, verifyDoctor);

export default router;
