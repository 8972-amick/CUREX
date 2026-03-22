import prisma from "../db/prisma.js";

export const createNotification = async (req, res) => {
  try {
    const { userId, title, message, type, metadata } = req.body;          

    if (!userId || !title || !message) {
      return res.status(400).json({
        message: "User ID, title, and message are required",
        success: false
      });
    }

    const VALID_TYPES = [
      "APPOINTMENT_BOOKED",
      "APPOINTMENT_CONFIRMED",
      "APPOINTMENT_CANCELLED",
      "APPOINTMENT_RESCHEDULED",
      "APPOINTMENT_REMINDER",
      "DOCTOR_AVAILABLE",
      "DOCTOR_UNAVAILABLE",
      "PAYMENT_CONFIRMED",
      "PAYMENT_FAILED",
      "PRESCRIPTION_READY",
      "LAB_RESULTS_READY",
      "NEW_MESSAGE",
      "REVIEW_REQUEST",
      "SYMPTOM_ANALYSIS_RESULT",
      "GENERAL"
    ];

    const resolvedType = type && VALID_TYPES.includes(type) ? type : "GENERAL";

    const notification = await prisma.notification.create({
      data: {
        userId: parseInt(userId),
        title,
        message,
        type: resolvedType,
        metadata: metadata ? JSON.stringify(metadata) : null
      }
    });

    return res.status(201).json({
      message: "Notification created successfully",
      success: true,
      notification
    });
  } catch (error) {
    console.error(" Error creating notification:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};


//This is Useful for broadcasting doctor availability changes, system alerts, etc.
export const createBulkNotification = async (req, res) => {
  try {
    const { userIds, title, message, type, metadata } = req.body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0 || !title || !message) {
      return res.status(400).json({
        message: "userIds (array), title, and message are required",
        success: false
      });
    }

    const data = userIds.map((id) => ({
      userId: parseInt(id),
      title,
      message,
      type: type || "GENERAL",
      metadata: metadata ? JSON.stringify(metadata) : null
    }));

    const result = await prisma.notification.createMany({ data });

    return res.status(201).json({
      message: `${result.count} notifications created successfully`,
      success: true,
      count: result.count
    });
  } catch (error) {
    console.error(" Error creating bulk notifications:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// This code is to get all notifications for a user (with optional type filter)
export const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10, type, isRead } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = { userId: parseInt(userId) };
    if (type) where.type = type;
    if (isRead !== undefined) where.isRead = isRead === "true";

    const [notifications, totalNotifications] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: parseInt(limit)
      }),
      prisma.notification.count({ where })
    ]);

    return res.status(200).json({
      message: "Notifications retrieved successfully",
      success: true,
      notifications,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalNotifications / parseInt(limit)),
        totalNotifications
      }
    });
  } catch (error) {
    console.error(" Error getting notifications:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// This code is to get the count of unread notifications for a user
export const getUnreadCount = async (req, res) => {
  try {
    const { userId } = req.params;

    const unreadCount = await prisma.notification.count({
      where: { userId: parseInt(userId), isRead: false }
    });

    return res.status(200).json({
      message: "Unread count retrieved successfully",
      success: true,
      unreadCount
    });
  } catch (error) {
    console.error(" Error retrieving unread count:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// This code is to mark a single notification as read
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
    console.error(" Error marking notification as read:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// This code is to mark all notifications as read for a user 
export const markAllAsRead = async (req, res) => {
  try {
    const { userId } = req.params;

    await prisma.notification.updateMany({
      where: { userId: parseInt(userId), isRead: false },
      data: { isRead: true }
    });

    return res.status(200).json({
      message: "All notifications marked as read",
      success: true
    });
  } catch (error) {
    console.error(" Error marking all as read:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// This code is to delete a single notification
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
    console.error(" Error deleting notification:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// This code is to delete ALL notifications for a user 
export const deleteAllNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await prisma.notification.deleteMany({
      where: { userId: parseInt(userId) }
    });

    return res.status(200).json({
      message: `${result.count} notifications deleted`,
      success: true,
      deletedCount: result.count
    });
  } catch (error) {
    console.error(" Error deleting all notifications:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// This code is to send appointment-specific notifications
export const sendAppointmentNotification = async ({
  userId,
  type,
  doctorName,
  date,
  time,
  metadata = {}
}) => {
  const templates = {
    APPOINTMENT_BOOKED: {
      title: "Appointment Booked ",
      message: `Your appointment with Dr. ${doctorName} on ${date} at ${time} has been successfully booked.`
    },
    APPOINTMENT_CONFIRMED: {
      title: "Appointment Confirmed ",
      message: `Dr. ${doctorName} has confirmed your appointment on ${date} at ${time}. Please be on time.`
    },
    APPOINTMENT_CANCELLED: {
      title: "Appointment Cancelled ",
      message: `Your appointment with Dr. ${doctorName} on ${date} at ${time} has been cancelled.`
    },
    APPOINTMENT_RESCHEDULED: {
      title: "Appointment Rescheduled ",
      message: `Your appointment with Dr. ${doctorName} has been rescheduled to ${date} at ${time}.`
    },
    APPOINTMENT_REMINDER: {
      title: "Appointment Reminder ⏰",
      message: `Reminder: You have an appointment with Dr. ${doctorName} tomorrow at ${time}. Don't forget!`
    }
  };

  const template = templates[type];
  if (!template) throw new Error(`Unknown appointment notification type: ${type}`);

  return prisma.notification.create({
    data: {
      userId: parseInt(userId),
      title: template.title,
      message: template.message,
      type,
      metadata: JSON.stringify({ doctorName, date, time, ...metadata })
    }
  });
};
