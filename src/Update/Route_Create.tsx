import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_api_url;

const Route_Create: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get Bus ID from URL
  const navigate = useNavigate();

  // State to hold form data
  const [formData, setFormData] = useState({
    location: "",
    estimatedArrivalTime: {
      hour: 0,
      minute: 0,
      second: 0,
      nano: 0,
    },
    estimatedDurationAtLocation: "",
    busId: id ? parseInt(id) : 0,
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle nested object changes (for estimatedArrivalTime)
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      estimatedArrivalTime: {
        ...formData.estimatedArrivalTime,
        [e.target.name]: parseInt(e.target.value),
      },
    });
  };

  // Submit form data to API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/bus/route/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create route");

      navigate(`/bus/${id}`); // Redirect to the bus details page after success
    } catch (error) {
      console.error("Error creating route:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Route</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        {/* Location Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="Enter location"
          />
        </div>

        {/* Estimated Arrival Time */}
        <div className="mb-4">
          <label className="block text-gray-700">Estimated Arrival Time</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="hour"
              value={formData.estimatedArrivalTime.hour}
              onChange={handleTimeChange}
              className="border p-2 w-1/4 rounded"
              placeholder="Hour"
            />
            <input
              type="number"
              name="minute"
              value={formData.estimatedArrivalTime.minute}
              onChange={handleTimeChange}
              className="border p-2 w-1/4 rounded"
              placeholder="Minute"
            />
            <input
              type="number"
              name="second"
              value={formData.estimatedArrivalTime.second}
              onChange={handleTimeChange}
              className="border p-2 w-1/4 rounded"
              placeholder="Second"
            />
          </div>
        </div>

        {/* Estimated Duration Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Estimated Duration</label>
          <input
            type="text"
            name="estimatedDurationAtLocation"
            value={formData.estimatedDurationAtLocation}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="Enter waiting estimated duration"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Route
        </button>
      </form>
    </div>
  );
};

export default Route_Create;
