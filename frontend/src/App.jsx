import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup"; // Adjust the path if your structure is differenimport { useState } from 'react'
import Login from "./components/Login";
import { Link } from "react-router-dom";
import MenteeDashboard from "./components/MenteeDashboard";
import MentorDashboard from "./components/MentorDashboard";
import { UserProvider, useUser } from "./context/UserContext";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mentee-dashboard" element={<MenteeDashboard />} />
          <Route path="/mentor-dashboard" element={<MentorDashboard />} />
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App
