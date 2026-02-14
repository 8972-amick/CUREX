import express from "express";
import prisma from "../db/prisma.js"; 

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();


// Create Appointment (only performed by the patients)
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { doctorId, appointmentDate, appointmentTime } = req.body;

    const appointment = await prisma.appointment.create({
      data: {
        doctorId: Number(doctorId),
        patientId: req.user.id,
        appointmentDate: new Date(appointmentDate),
        appointmentTime,
      },
    });

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create appointment" });
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

    const appointment = await prisma.appointment.update({
      where: { id: Number(req.params.id) },
      data: { status },
    });

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

export default router;
