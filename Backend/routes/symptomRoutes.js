import express from "express";
import {analyzeSymptoms} from "../controllers/symptomController";

const router = express.Router();
router.post("/analyze", analyzeSymptoms);

export default router;