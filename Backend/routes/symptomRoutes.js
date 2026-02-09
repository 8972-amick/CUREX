import express from "express";
import {analyzeSymptoms} from "../controllers/symptomControllers.js";

const symptomrouter = express.Router();
symptomrouter.post("/analyze", analyzeSymptoms);

export default symptomrouter;