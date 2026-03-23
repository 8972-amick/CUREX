import express from "express";
import {
  createNotification,
  createBulkNotification,
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications
} from "../controllers/notificationControllers.js";

const notificationRouter = express.Router();

notificationRouter.post("/create", createNotification);
notificationRouter.post("/bulk", createBulkNotification);
notificationRouter.get("/user/:userId", getNotifications);
notificationRouter.get("/user/:userId/unread-count", getUnreadCount);
notificationRouter.put("/:notificationId/read", markAsRead);
notificationRouter.put("/user/:userId/read-all", markAllAsRead);
notificationRouter.delete("/:notificationId", deleteNotification);
notificationRouter.delete("/user/:userId/all", deleteAllNotifications);
export default notificationRouter;
