import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_api_url;

const Club_update: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [clubData, setClubData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    email: "",
    contactNo: "",
  });

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/club/${id}`)
      .then((response) => {
        setClubData(response.data);
      })
      .catch((error) => console.error("Error fetching club details:", error));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setClubData((prev) => ({
      ...prev,
      [name]: value || prev[name as keyof typeof prev], // Ensure TypeScript knows it's a valid key
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/club/${id}`, clubData);
      alert("Club information updated successfully!");
      navigate(`/club/${id}`); // Redirect back to the club details page
    } catch (error) {
      console.error("Error updating club info:", error);
      alert("Failed to update club information.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Update Club Info
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={clubData.name}
            onChange={handleChange}
            placeholder="Club Name"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            value={clubData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="imageUrl"
            value={clubData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="email"
            value={clubData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="contactNo"
            value={clubData.contactNo}
            onChange={handleChange}
            placeholder="Contact Number"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Update Club Info
          </button>
        </form>
      </div>
    </section>
  );
};

export default Club_update;
