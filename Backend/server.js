import express from "express";
import "dotenv/config";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import symptomrouter from "./routes/symptomRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import notificationRouter from "./routes/notificationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import licenseRoute from "./routes/licenseRoute.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello Amick!");
});

app.use(express.json());


app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/symptoms", symptomrouter);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/notifications", notificationRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/license", licenseRoute);


app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
