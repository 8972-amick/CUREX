import express from "express"
import "dotenv/config"
import authRouter from "./routes/authRoutes.js"

const app = express();
const PORT = process.env.PORT || 3000; 

app.get("/", (req, res) => {
  res.send("Hello Amick!");
}); 

app.use(express.json());
app.use('/api/auth',authRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

