import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_api_url;

const Club_create: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    email: "",
    contactNo: "",
    image: null as File | null, // Image file
  });

  // Handle text input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("contactNo", formData.contactNo);

      if (formData.image) {
        formDataToSend.append("imageUrl", formData.image);
      }

      const response = await axios.post(
        `${API_BASE_URL}/club/add`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Club Created:", response.data);
      alert("Club created successfully!");
      navigate("/event"); // Redirect to club listing page
    } catch (error: any) {
      console.error(
        "Error creating club:",
        error.response?.data || error.message
      );
      alert("Failed to create club. Please try again.");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Club</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-semibold">Club Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold">Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block font-semibold">Contact Number:</label>
            <input
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-semibold">Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
          >
            Create Club
          </button>
        </form>
      </div>
    </section>
  );
};

export default Club_create;
