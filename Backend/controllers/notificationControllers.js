import prisma from "../db/prisma.js";

// Create a new notification
export const createNotification = async (req, res) => {
  try {
    const { userId, title, message, type } = req.body;

    if (!userId || !title || !message) {
      return res.status(400).json({
        message: "User ID, title, and message are required",
        success: false
      });
    }

    const notification = await prisma.notification.create({
      data: {
        userId: parseInt(userId),
        title,
        message,
        type: type || "GENERAL"
      }
    });

    return res.status(201).json({
      message: "Notification created successfully",
      success: true,
      notification
    });
  } catch (error) {
    console.error("🔥 Error creating notification:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

// Get all notifications for a user
export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const notifications = await prisma.notification.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { createdAt: 'desc' },
      skip: parseInt(skip),
      take: parseInt(limit)
    });

    const totalNotifications = await prisma.notification.count({
      where: { userId: parseInt(userId) }
    });

    return res.status(200).json({
      message: "Notifications retrieved successfully",
      success: true,
      notifications,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalNotifications / limit),
        totalNotifications
      }
    });
  } catch (error) {
    console.error("🔥 Error retrieving notifications:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

// Get unread notifications count for a user
export const getUnreadCount = async (req, res) => {
  try {
    const { userId } = req.params;

    const unreadCount = await prisma.notification.count({
      where: {
        userId: parseInt(userId),
        isRead: false
      }
    });

    return res.status(200).json({
      message: "Unread count retrieved successfully",
      success: true,
      unreadCount
    });
  } catch (error) {
    console.error("🔥 Error retrieving unread count:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await prisma.notification.update({
      where: { id: parseInt(notificationId) },
      data: { isRead: true }
    });

    return res.status(200).json({
      message: "Notification marked as read",
      success: true,
      notification
    });
  } catch (error) {
    console.error("🔥 Error marking notification as read:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

// Mark all notifications as read for a user
export const markAllAsRead = async (req, res) => {
  try {
    const { userId } = req.params;

    await prisma.notification.updateMany({
      where: {
        userId: parseInt(userId),
        isRead: false
      },
      data: { isRead: true }
    });

    return res.status(200).json({
      message: "All notifications marked as read",
      success: true
    });
  } catch (error) {
    console.error("🔥 Error marking all notifications as read:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    await prisma.notification.delete({
      where: { id: parseInt(notificationId) }
    });

    return res.status(200).json({
      message: "Notification deleted successfully",
      success: true
    });
  } catch (error) {
    console.error("🔥 Error deleting notification:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};