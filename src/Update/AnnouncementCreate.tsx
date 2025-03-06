import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_api_url;

const AnnouncementCreate: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get Bus ID from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state
  const [formData, setFormData] = useState({
    message: "",
    busId: id ? parseInt(id) : 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/announcement/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) navigate(`/bus/${id}`);
    } catch (error) {
      console.error("Error creating announcement:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          📢 Create Announcement
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Message Input */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Message
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter announcement message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded-md font-semibold transition 
              ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Announcement"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementCreate;
