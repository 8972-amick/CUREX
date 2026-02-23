import express from "express";
import {
  createNotification,
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification
} from "../controllers/notificationControllers.js";

const notificationRouter = express.Router();

// Create a new notification
notificationRouter.post('/create', createNotification);

// Get all notifications for a user
notificationRouter.get('/user/:userId', getNotifications);

// Get unread notifications count for a user
notificationRouter.get('/user/:userId/unread-count', getUnreadCount);

// Mark a specific notification as read
notificationRouter.put('/:notificationId/read', markAsRead);

// Mark all notifications as read for a user
notificationRouter.put('/user/:userId/read-all', markAllAsRead);

// Delete a notification
notificationRouter.delete('/:notificationId', deleteNotification);

export default notificationRouter;