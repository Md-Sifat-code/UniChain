import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navabr_Home from "../Home/Home_component/Navabr_Home";

const API_BASE_URL = import.meta.env.VITE_api_url; // Load base URL from env

const Facultypage: React.FC = () => {
  const [faculty, setFaculty] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/Faculty`); // Fetch faculty data
        if (!response.ok) {
          throw new Error("Failed to fetch faculty data");
        }
        const data = await response.json();
        setFaculty(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="container mx-auto p-6">
      <div className="mb-12">
        <Navabr_Home />
      </div>
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        Faculty Members
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {faculty.map((prof) => (
          <div
            key={prof.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex justify-center">
                <img
                  src={
                    prof.image
                      ? `${API_BASE_URL}/${prof.image}`
                      : "/default-user.png"
                  }
                  alt={prof.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
                />
              </div>
              <h2 className="text-2xl font-semibold text-center mt-4 text-gray-900">
                {prof.name}
              </h2>
              <p className="text-gray-600 text-center text-lg">
                {prof.department}
              </p>
              <p className="text-sm text-center mt-2 text-gray-500">
                🕒 Office Hours: {prof.officeHours}
              </p>

              <div className="mt-4 text-center">
                <p className="text-sm font-medium text-gray-700">Contact:</p>
                <p className="text-sm text-gray-600">📧 {prof.email}</p>
                <p className="text-sm text-gray-600">📞 {prof.phone}</p>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate(`/class/${prof.id}`)} // Navigate to /class/{id}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  View Courses
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Facultypage;
