import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Navabr_Home from "../Home/Home_component/Navabr_Home";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useUser } from "../../Authentication/Context_auth/UserContext"; // Import the user context

const API_BASE_URL = import.meta.env.VITE_api_url;

interface Event {
  id: number;
  title: string;
  description: string;
  startTime: string | null;
  endTime: string | null;
  location: string;
  imageUrl: string;
}

interface ClubDetails {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  email: string;
  contactNo: string;
  events: Event[];
}

const Club_Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser(); // Get user details from context
  const [club, setClub] = useState<ClubDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const isAdmin = user?.roles?.some(
    (role: { roleType: string }) => role.roleType === "ADMIN"
  );

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/club/${id}`)
      .then((response) => {
        setClub({
          ...response.data,
          events: response.data.events || [], // Ensure events is always an array
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching club details:", error);
        setError("Failed to load club details");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <p className="text-center text-gray-600 mt-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <section className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <Navabr_Home />
        <Link to="/event" className="text-red-600 mt-6 inline-block text-lg">
          <FaRegArrowAltCircleLeft className="inline-block mr-2" />
          Back to Events
        </Link>

        {/* Club Details */}
        <div className="flex flex-col lg:flex-row justify-between items-start w-full shadow-2xl rounded-2xl bg-white gap-12 mt-12 px-6 py-8">
          <div className="flex flex-col items-center lg:flex-row gap-12">
            <img
              src={club?.imageUrl}
              alt={club?.name}
              className="w-full md:w-[250px] h-[250px] object-cover rounded-lg shadow-xl"
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{club?.name}</h2>
              <p className="text-gray-600 mt-2">{club?.description}</p>
              <p className="text-gray-600 mt-2">
                <strong>📞 Contact:</strong> {club?.contactNo}
              </p>
              <p className="text-gray-600 mt-2">
                <strong>✉️ Email:</strong> {club?.email}
              </p>

              {/* Show Update Info Button for Admins */}
            </div>
          </div>
        </div>

        {/* Club Events Section */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              🎉 Upcoming Events
            </h1>
            {isAdmin && (
              <button
                onClick={() => navigate(`/event/create/${id}`)}
                className="px-8 font-bold py-3 bg-blue-300 rounded-4xl"
              >
                Add Event
              </button>
            )}
          </div>

          {club?.events?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              {club.events.map((event) => (
                <motion.div
                  key={event.id}
                  whileHover={{ scale: 1.05 }}
                  className="relative bg-white shadow-lg rounded-lg overflow-hidden transition hover:shadow-xl"
                >
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded">
                    📍 {event.location}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mt-2 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-gray-700 text-sm">
                      <span>
                        🕒 {event.startTime || "TBD"} - {event.endTime || "TBD"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-lg text-center mt-4">
              No upcoming events.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Club_Details;
