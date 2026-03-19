import express from "express";
import {
  getChats,
  createOrGetChat,
  getMessages,
} from "../controllers/chatController.js";

const router = express.Router();

router.get("/user/:userId", getChats);
router.post("/create", createOrGetChat);
router.get("/:chatId/messages", getMessages);

export default router;
