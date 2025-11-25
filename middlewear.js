import multer from "multer";
import jwt from "jsonwebtoken";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

// authMiddleware can optionally skip public routes
export default function authMiddleware(req, res, next) {
  // Define public routes here
  const publicRoutes = [
    "/api/v1/project/all-projects",
    // add more public routes if needed
  ];

  if (publicRoutes.includes(req.originalUrl)) {
    return next(); // skip auth for public route
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // attach decoded token to request
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}
