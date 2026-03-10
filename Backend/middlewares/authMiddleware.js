import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // split function to get the token from "Bearer  token" and [1] to get the token part

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // must have id or contain id
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
