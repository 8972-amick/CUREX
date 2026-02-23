import express from "express";
import "dotenv/config";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import symptomrouter from "./routes/symptomRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import notificationRouter from "./routes/notificationRoutes.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello Amick!");
});

app.use(express.json());

// enable CORS for frontend requests (adjust origin in production)
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/symptoms", symptomrouter);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/notifications", notificationRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
