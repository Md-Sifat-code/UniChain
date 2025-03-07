import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_api_url; // API base URL

const Restaurant_Create: React.FC = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    contactNumber: "",
    contactNumber2: "",
    email: "",
    isOpen: "false", // Ensure it's a string
    image: null as File | null, // Image file
  });

  // Handle text input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
      formDataToSend.append("location", formData.location);
      formDataToSend.append("contactNumber", formData.contactNumber);
      formDataToSend.append("contactNumber2", formData.contactNumber2);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("isOpen", formData.isOpen);

      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await axios.post(
        `${API_BASE_URL}/Restaurant/add`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" }, // Correct content type
        }
      );

      console.log("Restaurant Created:", response.data);
      alert("Restaurant created successfully!");

      navigate("/canteen"); // Redirect after success
    } catch (error: any) {
      console.error(
        "Error creating restaurant:",
        error.response?.data || error.message
      );
      alert("Failed to create restaurant. Please try again.");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Restaurant
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-semibold">Restaurant Name:</label>
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

          {/* Location */}
          <div>
            <label className="block font-semibold">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Contact Number 1 */}
          <div>
            <label className="block font-semibold">Contact Number 1:</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Contact Number 2 */}
          <div>
            <label className="block font-semibold">Contact Number 2:</label>
            <input
              type="text"
              name="contactNumber2"
              value={formData.contactNumber2}
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

          {/* Is Open (Dropdown) */}
          <div>
            <label className="block font-semibold">Is Open:</label>
            <select
              name="isOpen"
              value={formData.isOpen}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="true">Open</option>
              <option value="false">Closed</option>
            </select>
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
            Create Restaurant
          </button>
        </form>
      </div>
    </section>
  );
};

export default Restaurant_Create;
