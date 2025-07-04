import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

// Dummy data for mentorship requests
const menteesRequesting = [
  {
    name: "John Doe",
    field: "Cybersecurity",
    email: "john.doe@email.com",
  },
  {
    name: "Jane Smith",
    field: "Cloud Computing",
    email: "jane.smith@email.com",
  },
  {
    name: "Mike Johnson",
    field: "Web Development",
    email: "mike.johnson@email.com",
  },
];

const MentorDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [requests, setRequests] = useState(menteesRequesting);

  const handleDecision = (email, action) => {
    setRequests((prev) => prev.filter((mentee) => mentee.email !== email));
    // TODO: Add API call to update mentee status
    alert(`You have ${action}ed the request from ${email}`);
  };

  const handleLogout = () => {
    // TODO: Add logout logic
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col">
      {/* Top bar */}
      <div className="flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-700">
          Mentor Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-semibold text-gray-700">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
          <img
            src={`https://ui-avatars.com/api/?name=${user.name.replace(" ", "+")}&background=4f8cff&color=fff`}
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
      <div className="flex-1 p-6 max-w-4xl mx-auto w-full">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Mentee Requests</h2>
        {requests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requests.map((mentee, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-400"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={`https://ui-avatars.com/api/?name=${mentee.name.replace(" ", "+")}&background=2563eb&color=fff`}
                    alt={mentee.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-bold text-lg text-blue-700">{mentee.name}</div>
                    <div className="text-gray-500 text-sm">{mentee.field}</div>
                    <div className="text-sm text-gray-400">{mentee.email}</div>
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleDecision(mentee.email, "accept")}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecision(mentee.email, "reject")}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500">No mentee requests at the moment.</div>
        )}
      </div>
    </div>
  );
};

export default MentorDashboard;
