import express from "express"
import "dotenv/config"
import prisma from "./db/prisma.js";

const app = express();
const PORT = process.env.PORT || 3000; 

app.get("/", (req, res) => {
  res.send("Hello Amick!");
}); 

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

