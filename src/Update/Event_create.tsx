import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_api_url;

const Event_create: React.FC = () => {
  const { clubId } = useParams<{ clubId: string }>(); // Get clubId from URL params
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    location: "",
    image: null as File | null, // File upload
  });

  const [error, setError] = useState<string | null>(null);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Debug: Log form data
    console.log("Form Data Before Validation:", formData);
    console.log("Club ID:", clubId);

    // Validate required fields
    if (
      !formData.title ||
      !formData.description ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.location ||
      !clubId
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append(
      "startTime",
      new Date(formData.startTime).toISOString().split("T")[0]
    ); // Convert to YYYY-MM-DD
    formDataToSend.append(
      "endTime",
      new Date(formData.endTime).toISOString().split("T")[0]
    ); // Convert to YYYY-MM-DD
    formDataToSend.append("location", formData.location);
    formDataToSend.append("clubId", clubId); // Ensure it's sent as a number

    if (formData.image) {
      formDataToSend.append("imageUrl", formData.image);
    }

    // Debug: Log FormData before sending
    for (const [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/event/add`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Event Created:", response.data);
      alert("Event created successfully!");
      navigate(`/event`);
    } catch (error: any) {
      console.error(
        "Error creating event:",
        error.response?.data || error.message
      );
      setError(
        "Failed to create event. Please check your input and try again."
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Event</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Start Time</label>
          <input
            type="date"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">End Time</label>
          <input
            type="date"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            name="imageUrl"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default Event_create;
