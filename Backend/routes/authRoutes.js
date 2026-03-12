import express from "express";
import { signUp, logIn, logOut } from "../controllers/authControllers.js";
import { signUpValidation, loginValidation } from "../middlewares/authValidation.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import prisma from "../db/prisma.js";

const authRouter = express.Router();

authRouter.post("/register", signUpValidation, signUp);
authRouter.post("/logIn", loginValidation, logIn);
authRouter.post("/logOut", logOut);

// current user
authRouter.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { name: true, email: true },
    });

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default authRouter;