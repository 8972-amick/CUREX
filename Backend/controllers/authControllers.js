import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, role, licenseNumber } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    if (role === "DOCTOR" && (!licenseNumber || !licenseNumber.trim())) {
      return res.status(400).json({
        message: "License number is required for doctor registration",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "PATIENT",
        licenseNumber: role === "DOCTOR" ? licenseNumber : null,
      },
    });

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    });

  } catch (error) {
    console.error("🔥 Prisma Error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    const errorMsg = "Authentication failed, Email or Password is invalid";
    if (!user) {
      return res.status(401).json({ message: errorMsg, success: false });
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      return res.status(401).json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login Success",
      success: true,
      token: jwtToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("🔥 Prisma Error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logOut = async (req, res) => {
  try {
    
    res.status(200).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
