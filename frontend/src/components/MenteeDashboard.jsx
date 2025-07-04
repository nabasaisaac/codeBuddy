import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import api from "../api";

const MenteeDashboard = () => {
  const [search, setSearch] = useState("");
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const fetchMentors = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/mentors", {
          params: { degree: user.degree, search },
        });
        setMentors(res.data);
      } catch (err) {
        setError("Failed to load mentors");
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, [user, search]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleRequest = async (mentorId) => {
    try {
      await api.post("/mentors/request", { mentorId });
      alert("Mentorship request sent!");
    } catch (err) {
      alert("Failed to send request");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col">
      {/* Top bar */}
      <div className="flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-700">
          Mentee dashboard
        </h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-semibold text-gray-700">{user.name}</div>
            <div className="text-sm text-gray-500">{user.degree}</div>
          </div>
          <img
            src={`https://ui-avatars.com/api/?name=${user.name.replace(
              " ",
              "+"
            )}&background=4f8cff&color=fff`}
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-blue-400"
          />
          <button
            onClick={handleLogout}
            className="ml-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 flex flex-col max-w-4xl mx-auto w-full">
        {/* Search bar */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="w-full md:w-2/3">
            <input
              type="text"
              placeholder="Search for mentorship fields (e.g., Cloud, Data Science)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
          </div>
        </div>

        {/* Suggested mentors */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Suggested Mentors in {user.degree}
          </h2>
          {loading ? (
            <div>Loading mentors...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mentors.length > 0 ? (
                mentors.map((mentor) => (
                  <div
                    key={mentor.mentor_id}
                    className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-2 border-t-4 border-blue-400"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${mentor.name.replace(
                          " ",
                          "+"
                        )}&background=2563eb&color=fff`}
                        alt={mentor.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="font-bold text-lg text-blue-700">
                          {mentor.name}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {mentor.field}
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-600 mt-2">
                      Experience:{" "}
                      <span className="font-medium">{mentor.experience}</span>
                    </div>
                    <button
                      className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                      onClick={() => handleRequest(mentor.mentor_id)}
                    >
                      Request Mentorship
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 col-span-2">
                  No mentors found for your search.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenteeDashboard;
