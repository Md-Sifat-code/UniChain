import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_api_url;

const Bus_Create: React.FC = () => {
  const [busNumber, setBusNumber] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const busData = {
      busNumber,
      startPoint,
      endPoint,
    };

    try {
      await axios.post(`${API_BASE_URL}/bus/create`, busData);
      setMessage("Bus created successfully!");

      // ✅ Redirect to "/bus" after 1.5 seconds
      setTimeout(() => navigate("/bus"), 1500);

      // Clear form inputs
      setBusNumber("");
      setStartPoint("");
      setEndPoint("");
    } catch (error) {
      console.error("Error creating bus:", error);
      setMessage("Failed to create bus. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create a New Bus</h2>

      {message && <p className="mb-4 text-center text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Bus Number</label>
          <input
            type="text"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Start Point</label>
          <input
            type="text"
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">End Point</label>
          <input
            type="text"
            value={endPoint}
            onChange={(e) => setEndPoint(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Create Bus"}
        </button>
      </form>
    </div>
  );
};

export default Bus_Create;
