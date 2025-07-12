import { findUserById } from "../models/user.js";

export async function getProfile(req, res) {
  try {
    const user = await findUserById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" }); //returning user not found
    res.json({
      id: user.user_id,
      name: user.name,
      email: user.email,
      degree: user.degree,
      role: user.role,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch profile", error: err.message });
  }
}
