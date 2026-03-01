import express from 'express';
import { getDoctors, verifyDoctor } from '../controllers/adminControllers';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();
