import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";                            


export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await prisma.user.findUnique({
      where:{email} ,
    });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash( password, 10);
   await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
     

   });
   console.log("User created successfully");
     return res.status(201).json({
      message: "User created successfully",
      success: true,
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user  = await prisma.user.findUnique({ email });

    const errorMsg = "Authentication failed, Email or Password is Invalid";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login Success",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logOut = async (req, res) => {
   try {
      
      
   } catch (error) {
      
   }
};
