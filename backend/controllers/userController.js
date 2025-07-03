import { findUserById } from "../models/user.js";

export function getProfile(req, res) {
  const user = findUserById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    degree: user.degree,
    role: user.role,
  });
}
