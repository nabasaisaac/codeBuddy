import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1]; // Optional chaining

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Ensure 'id' and 'role' are present in the token
    if (!decoded?.id || !decoded?.role) {
      return res.status(403).json({ message: "Invalid token payload" });
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}
