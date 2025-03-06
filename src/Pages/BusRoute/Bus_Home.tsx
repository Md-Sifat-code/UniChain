import React, { useEffect, useState } from "react";
import { FaBusAlt } from "react-icons/fa";

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
    <div className="container mx-auto p-12">
      <h2 className="text-2xl font-bold mb-4 text-center">🚌 Bus Routes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {buses.map((bus) => (
          <div
            key={bus.id}
            className="bg-white shadow-lg p-6 rounded-lg flex items-center space-x-4 border-l-4 border-blue-500"
          >
            <FaBusAlt className="text-blue-500 text-4xl" />
            <div>
              <h3 className="text-xl font-semibold">Bus #{bus.busNumber}</h3>
              <p className="text-gray-600">📍 From: {bus.startPoint}</p>
              <p className="text-gray-600">🏁 To: {bus.endPoint}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bus_Home;
