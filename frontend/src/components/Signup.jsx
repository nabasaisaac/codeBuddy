import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    degree: "",
    role: "Mentee",
  });

  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add your signup logic here (API call, validation, etc.)
    setUser({
      name: form.name,
      email: form.email,
      degree: form.degree,
      role: form.role,
    });
    if (form.role === "Mentee") {
      navigate("/mentee-dashboard");
    } else if (form.role === "Mentor") {
      // You can add mentor dashboard navigation here in the future
      alert("Mentor dashboard not implemented yet!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="degree">
              Degree
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="degree"
              name="degree"
              value={form.degree}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select your degree
              </option>
              <option value="BSCS">BSCS</option>
              <option value="BSIT">BSIT</option>
              <option value="BSDS">BSDS</option>
            </select>
          </div>
          <div>
            <span className="block text-gray-700 font-medium mb-1">Role</span>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="Mentee"
                  checked={form.role === "Mentee"}
                  onChange={handleChange}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2 text-gray-700">Mentee</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="Mentor"
                  checked={form.role === "Mentor"}
                  onChange={handleChange}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2 text-gray-700">Mentor</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
          >
            Create Account
          </button>
        </form>
        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup; 