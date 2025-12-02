import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findone({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const UserModel = new UserModel({ name, email, password });
    UserModel.password = await bcrypt.hash(password, 10);
    await UserModel.save();
    res
      .status(201)
      .json({ message: "user created successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logIn = async (req, res) => {
   try {
    const { username, email, password } = req.body;
    const user = await UserModel.findone({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const UserModel = new UserModel({ name, email, password });
    UserModel.password = await bcrypt.hash(password, 10);
    await UserModel.save();
    res
      .status(201)
      .json({ message: "user created successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


export const logOut = async (req, res) => {};
