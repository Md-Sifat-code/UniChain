import React, { useEffect, useState } from "react";
import { FaBusAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../Authentication/Context_auth/UserContext";
import { IoArrowBackCircle } from "react-icons/io5";

const API_BASE_URL = import.meta.env.VITE_api_url;

interface Bus {
  id: number;
  busNumber: string;
  startPoint: string;
  endPoint: string;
}

const Bus_Home: React.FC = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useUser(); // Get user details from context
  const isAdmin = user?.roles?.some(
    (role: { roleType: string }) => role.roleType === "ADMIN"
  );
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/bus`);
        if (!response.ok) {
          throw new Error("Failed to fetch bus data");
        }
        const data = await response.json();
        setBuses(data);
      } catch (err) {
        setError("Error fetching buses");
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  if (loading)
    return <div className="text-center text-xl mt-10">Loading buses...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
      <Link className="text-2xl text-blue-800" to={"/home"}><IoArrowBackCircle /></Link>
        <h2 className="text-2xl font-bold mb-4 text-center">🚌 Bus Routes</h2>
        {isAdmin && (
          <button
            onClick={() => navigate("/bus/create")}
            className="px-8 font-bold py-3 bg-blue-300 rounded-4xl"
          >
            Add Bus
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {buses.map((bus) => (
          <div
            key={bus.id}
            className="bg-white shadow-lg p-6 rounded-lg border-l-4 border-blue-500 flex flex-col items-start"
          >
            <div className="flex items-center space-x-4 mb-4">
              <FaBusAlt className="text-blue-500 text-4xl" />
              <div>
                <h3 className="text-xl font-semibold">Bus #{bus.busNumber}</h3>
                <p className="text-gray-600">📍 From: {bus.startPoint}</p>
                <p className="text-gray-600">🏁 To: {bus.endPoint}</p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/bus/${bus.id}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition w-full text-center"
            >
              Check Routes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bus_Home;
