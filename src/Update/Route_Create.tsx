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

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Limit value to 2 digits
    if (value.length <= 2) {
      setFormData({
        ...formData,
        estimatedArrivalTime: {
          ...formData.estimatedArrivalTime,
          [name]: value,
        },
      });
    }

    // Automatically switch to the next field if more than 2 digits are entered
    if (value.length === 2) {
      switch (name) {
        case 'hour':
          document.getElementById('minute')?.focus();
          break;
        case 'minute':
          document.getElementById('second')?.focus();
          break;
        default:
          break;
      }
    }
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
      <div className="flex flex-col items-center">
        <input
          id="hour"
          type="number"
          name="hour"
          value={formData.estimatedArrivalTime.hour}
          onChange={handleTimeChange}
          className="border p-2 w-[50px] rounded"
          placeholder="Hour"
          maxLength={2} // Optional, but can be used for added validation
        />
        <h1>Hour</h1>
      </div>
      <div className="flex flex-col items-center">
        <input
          id="minute"
          type="number"
          name="minute"
          value={formData.estimatedArrivalTime.minute}
          onChange={handleTimeChange}
          className="border p-2 w-[50px] rounded"
          placeholder="Minute"
          maxLength={2} // Optional, but can be used for added validation
        />
        <h1>Minute</h1>
      </div>
      <div className="flex flex-col items-center">
        <input
          id="second"
          type="number"
          name="second"
          value={formData.estimatedArrivalTime.second}
          onChange={handleTimeChange}
          className="border p-2 w-[50px] rounded"
          placeholder="Second"
          maxLength={2} // Optional, but can be used for added validation
        />
        <h1>Second</h1>
      </div>
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
