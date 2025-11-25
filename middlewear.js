import multer from "multer";
import jwt from "jsonwebtoken";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export default function authMiddleware(req, res, next) {
  const publicRoutes = [
    "/api/v1/project/all-projects",
  ];

  // Skip auth if request starts with a public route
  if (publicRoutes.some(route => req.originalUrl.startsWith(route))) {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}