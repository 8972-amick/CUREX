import prisma from "../db/prisma";

//get all doctors
export const getDoctors = async (req, res) => {
  try {
    const doctors = await prisma.user.findMany({
      where: {
        role: "DOCTOR",
      },
      select: {
        id: true,
        name: true,
        email: true,
        licenseNumber: true,
        isVerified: true,
      },
    });
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

  //verify the doctor
  export const verifyDoctor = async (req, res) => {
    try {
      const { id } = req.params;
      const doctor = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { isVerified: true },
      });
      res.json({
        message: "Doctor verified successfully",
        doctor,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server error",
      });
    }
  };

