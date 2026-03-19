import express from 'express';
import { getDoctors, verifyDoctor } from '../controllers/adminControllers.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/doctors', authMiddleware, requireRole('ADMIN'), getDoctors);
router.put('/doctors/:id/verify', authMiddleware, requireRole('ADMIN'), verifyDoctor);

export default router;
