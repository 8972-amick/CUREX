import express from "express";
import prisma from "../db/prisma.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Helper function to create notifications
const createNotification = async (userId, title, message, type = "APPOINTMENT_STATUS_UPDATE") => {
  try {
    await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type
      }
    });
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};


// Create Appointment (only performed by the patients)
router.post("/create", authMiddleware, async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const { doctorId, appointmentDate, appointmentTime } = req.body;

    const appointment = await prisma.appointment.create({
      data: {
        doctorId: Number(doctorId),
        patientId: req.user.id,
        appointmentDate: new Date(appointmentDate),
        appointmentTime,
      },
      include: {
        doctor: true,
        patient: true
      }
    });

    // Create notification for doctor
    await createNotification(
      appointment.doctorId,
      "New Appointment Request",
      `You have a new appointment request from ${appointment.patient.name} on ${new Date(appointment.appointmentDate).toLocaleDateString()} at ${appointment.appointmentTime}`,
      "APPOINTMENT_STATUS_UPDATE"
    );

    res.json(appointment);
  } catch (error) {
    console.error("CREATE APPOINTMENT ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});


// Get all doctors appointments
router.get("/doctor", authMiddleware, async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId: req.user.id,
      },
      include: {
        patient: true,
      },
      orderBy: {
        appointmentDate: "asc",
      },
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});


// Get Patient Appointments
router.get("/patient", authMiddleware, async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        patientId: req.user.id,
      },
      include: {
        doctor: true,
      },
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});


// Update Status (Doctor)
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await prisma.appointment.findUnique({
      where: { id: Number(req.params.id) },
      include: { patient: true, doctor: true },
    });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Optional: prevent other doctors from updating
    if (appointment.doctorId !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: Number(req.params.id) },
      data: { status },
    });

    const statusMessages = {
      APPROVED: "Your appointment has been approved",
      REJECTED: "Your appointment has been rejected",
      COMPLETED: "Your appointment has been completed",
    };

    if (statusMessages[status]) {
      await createNotification(
        appointment.patientId,
        "Appointment Status Update",
        `${statusMessages[status]} with Dr. ${
          appointment.doctor.name
        } on ${new Date(
          appointment.appointmentDate
        ).toLocaleDateString()}`
      );
    }

    res.json(updatedAppointment);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ error: "Update failed" });
  }
});
// Send appointment reminders (can be called by a cron job)
router.post("/send-reminders", async (req, res) => {
  try {
    // Get appointments for the next 24 hours
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const upcomingAppointments = await prisma.appointment.findMany({
      where: {
        appointmentDate: {
          gte: new Date(),
          lte: tomorrow
        },
        status: "APPROVED"
      },
      include: {
        patient: true,
        doctor: true
      }
    });

    let remindersSent = 0;

    for (const appointment of upcomingAppointments) {
      // Check if reminder already sent (you might want to add a field for this)
      const existingReminder = await prisma.notification.findFirst({
        where: {
          userId: appointment.patientId,
          title: "Appointment Reminder",
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
          }
        }
      });

      if (!existingReminder) {
        await createNotification(
          appointment.patientId,
          "Appointment Reminder",
          `You have an appointment with Dr. ${appointment.doctor.name} tomorrow at ${appointment.appointmentTime}`,
          "APPOINTMENT_REMINDER"
        );
        remindersSent++;
      }
    }

    res.json({ message: `Reminders sent to ${remindersSent} patients` });
  } catch (error) {
    console.error("SEND REMINDERS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
