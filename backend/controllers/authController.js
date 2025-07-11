import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";
import { createUser, findUserByEmail, validateUser } from "../models/user.js";

export async function signup(req, res) {
  try {
    const { name, email, password, degree, role } = req.body;
    if (!name || !email || !password || !degree || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (await findUserByEmail(email)) {
      return res.status(409).json({ message: "Email already registered" });
    }
    console.log(req.body)
    const user_id = await createUser({ name, email, password, degree, role });
    const token = jwt.sign({ id: user_id, email, role, degree }, JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ user: { id: user_id, name, email, degree, role }, token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await validateUser(email, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        id: user.user_id,
        email: user.email,
        role: user.role,
        degree: user.degree,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        degree: user.degree,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
}

export function logout(req, res) {
  res.json({ message: "Logged out" });
}
