import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaBullhorn } from "react-icons/fa";
import { useUser } from "../../Authentication/Context_auth/UserContext";

const API_BASE_URL = import.meta.env.VITE_api_url;

interface Route {
  id: number;
  location: string;
  estimatedArrivalTime: string | null;
  estimatedDurationAtLocation: string;
}

interface Announcement {
  id: number;
  message: string;
}

interface BusDetails {
  id: number;
  busNumber: string;
  startPoint: string;
  endPoint: string;
  routes: Route[];
  announcements: Announcement[];
}

const Bus_Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bus, setBus] = useState<BusDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser(); // Get user details from context

  // Check if user is ADMIN
  const isAdmin = user?.roles?.some(
    (role: { roleType: string }) => role.roleType === "ADMIN"
  );

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/bus/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch bus details");
        }
        const data = await response.json();
        setBus(data);
      } catch (err) {
        setError("Error fetching bus details");
      } finally {
        setLoading(false);
      }
    };

    fetchBusDetails();
  }, [id]);

  if (loading)
    return (
      <div className="text-center text-xl mt-10">Loading bus details...</div>
    );
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        🚌 Bus #{bus?.busNumber} Details
      </h2>

      {/* Bus Details Card */}
      <div className="bg-white shadow-lg p-6 rounded-lg mb-6 border-l-4 border-blue-500">
        <h3 className="text-xl font-semibold">Bus #{bus?.busNumber}</h3>
        <p className="text-gray-600">📍 From: {bus?.startPoint}</p>
        <p className="text-gray-600">🏁 To: {bus?.endPoint}</p>
      </div>

      {/* Routes Section */}
      <div className="flex flex-row justify-between mt-8 items-center mb-8">
        <h3 className="text-xl font-bold">🛤️ Routes</h3>
        {isAdmin && (
          <button
            onClick={() =>
              navigate(`/bus/update/${id}`, { state: { busId: id } })
            }
            className="px-8 font-bold py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
          >
            ➕ Add Route
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bus?.routes.length ? (
          bus.routes.map((route) => (
            <div
              key={route.id}
              className="bg-gray-100 p-4 rounded-lg shadow-sm border-l-4 border-green-500"
            >
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-500" /> {route.location}
              </h4>
              <p className="text-gray-600">
                ⏳ Duration: {route.estimatedDurationAtLocation} mins
              </p>
              {route.estimatedArrivalTime && (
                <p className="text-gray-600">
                  🕒 Arrival: {route.estimatedArrivalTime}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No routes available</p>
        )}
      </div>

      {/* Announcements Section */}
      <div className="flex flex-row justify-between items-center mb-8">
        <h3 className="text-xl font-bold mt-8 mb-4">📢 Announcements</h3>
        {isAdmin && (
          <button
            onClick={() =>
              navigate(`/bus/announcement/${id}`, { state: { busId: id } })
            }
            className="px-8 font-bold py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600"
          >
            ➕ Add Announcement
          </button>
        )}
      </div>
      {bus?.announcements.length ? (
        <div className="space-y-4">
          {bus.announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-yellow-100 p-4 rounded-lg shadow-sm flex items-center gap-3"
            >
              <FaBullhorn className="text-yellow-500 text-2xl" />
              <p className="text-gray-700">{announcement.message}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No announcements available</p>
      )}
    </div>
  );
};

export default Bus_Details;
