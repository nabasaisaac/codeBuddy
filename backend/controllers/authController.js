import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";
import { addUser, findUserByEmail, validateUser } from "../models/user.js";

export function signup(req, res) {
  const { name, email, password, degree, role } = req.body;
  if (!name || !email || !password || !degree || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (findUserByEmail(email)) {
    return res.status(409).json({ message: "Email already registered" });
  }
  const user = { id: Date.now(), name, email, password, degree, role };
  addUser(user);
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, degree: user.degree },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.json({ user: { id: user.id, name, email, degree, role }, token });
}

export function login(req, res) {
  const { email, password } = req.body;
  const user = validateUser(email, password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, degree: user.degree },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      degree: user.degree,
      role: user.role,
    },
    token,
  });
}

export function logout(req, res) {
  res.json({ message: "Logged out" });
}
