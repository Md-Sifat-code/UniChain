import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../Authentication/Context_auth/UserContext"; // Import UserContext

const API_BASE_URL = import.meta.env.VITE_api_url;

const Canteen_Update: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUser(); // Get user info from context

  const [canteenData, setCanteenData] = useState({
    name: "",
    description: "",
    location: "",
    contactNumber: "",
    contactNumber2: "",
    email: "",
    isOpen: "",
    image: "",
    userId: user?.id || 0, // Get userId from context
  });

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/Restaurant/${id}`)
      .then((response) => {
        setCanteenData(response.data);
      })
      .catch((error) =>
        console.error("Error fetching canteen details:", error)
      );
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setCanteenData((prev) => ({
      ...prev,
      [name]: value || prev[name as keyof typeof prev], // Ensure valid key update
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/Restaurant/${id}`, canteenData);
      alert("Canteen information updated successfully!");
      navigate(`/canteen/restaurant/${id}`); // Redirect back to the canteen details page
    } catch (error) {
      console.error("Error updating canteen info:", error);
      alert("Failed to update canteen information.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Update Canteen Info
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={canteenData.name}
            onChange={handleChange}
            placeholder="Canteen Name"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            value={canteenData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="location"
            value={canteenData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="contactNumber"
            value={canteenData.contactNumber}
            onChange={handleChange}
            placeholder="Primary Contact Number"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="contactNumber2"
            value={canteenData.contactNumber2}
            onChange={handleChange}
            placeholder="Secondary Contact Number"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="email"
            value={canteenData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="isOpen"
            value={canteenData.isOpen}
            onChange={handleChange}
            placeholder="Is Open (true/false)"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="image"
            value={canteenData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Update Canteen Info
          </button>
        </form>
      </div>
    </section>
  );
};

export default Canteen_Update;
