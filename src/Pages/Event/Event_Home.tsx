import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSearch, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Navabr_Home from "../Home/Home_component/Navabr_Home";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_api_url;
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/200";

interface Club {
  id: number;
  name: string;
  imageUrl: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
}

const Event_Home: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [events, setEvents] = useState<Event[]>([]);
  const [loadingClubs, setLoadingClubs] = useState<boolean>(true);
  const [loadingEvents, setLoadingEvents] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  // Fetch clubs
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/club`)
      .then((response) => {
        const clubData = response.data.map((club: any) => ({
          id: club.id,
          name: club.name,
          imageUrl: club.imageUrl ? club.imageUrl : PLACEHOLDER_IMAGE,
        }));

        setClubs(clubData);
        setFilteredClubs(clubData);
        setLoadingClubs(false);
      })
      .catch((error) => {
        console.error("Error fetching clubs:", error);
        setError("Failed to load clubs");
        setLoadingClubs(false);
      });
  }, []);

  // Fetch events
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/event`)
      .then((response) => {
        const eventData = response.data.map((event: any) => ({
          id: event.id,
          name: event.name,
          date: event.date,
          imageUrl: event.imageUrl ? event.imageUrl : PLACEHOLDER_IMAGE,
        }));

        setEvents(eventData);
        setLoadingEvents(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("Failed to load events");
        setLoadingEvents(false);
      });
  }, []);

  // Handle search input change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter clubs based on search query
    const filtered = clubs.filter((club) =>
      club.name.toLowerCase().includes(query)
    );
    setFilteredClubs(filtered);
  };

  const handleClubClick = (id: number) => {
    navigate(`/event/club/${id}`);
  };

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <motion.div className="bg-gray-200 animate-pulse rounded-lg shadow-md overflow-hidden h-52">
      <div className="h-40 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-400 rounded w-3/4"></div>
      </div>
    </motion.div>
  );

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bgland">
      <div className="container mx-auto p-6">
        {/* Navbar */}
        <Navabr_Home />

        {/* Search Bar */}
        <div className="flex justify-center mb-6 mt-2">
          <div className="flex items-center bg-white mb-6 shadow-md rounded-[18px] p-2 w-full max-w-3xl">
            <FaSearch className="text-black ml-3" />
            <input
              type="text"
              placeholder="Search for clubs..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-2 outline-none text-gray-700 bg-transparent"
            />
          </div>
        </div>

        {/* Clubs Section */}
        <div className="mt-8 relative">
          <h2 className="text-3xl poppin mb-10 font-semibold text-gray-800 roboto">
            Explore Clubs
          </h2>

          {error && <p className="text-center text-red-500 mt-4">{error}</p>}
          {filteredClubs.length === 0 && !loadingClubs && !error && (
            <p className="text-center text-gray-600 mt-4">No clubs found.</p>
          )}

          {/* Left Scroll Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-56 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition z-10"
          >
            <FaChevronLeft className="text-red-600 text-2xl" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 mt-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 no-scrollbar"
          >
            {loadingClubs
              ? Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : filteredClubs.map((club) => (
                  <motion.div
                    key={club.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer snap-start flex-shrink-0 
                     w-[calc(100%-1rem)] sm:w-[calc(100%/1-1rem)] md:w-[calc(100%/2-1rem)] lg:w-[calc(100%/3-1rem)]"
                    onClick={() => handleClubClick(club.id)}
                  >
                    <img
                      src={club.imageUrl}
                      alt={club.name}
                      className="w-full h-72 object-cover"
                    />
                  </motion.div>
                ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-56 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 transition z-10"
          >
            <FaChevronRight className="text-red-600 text-2xl" />
          </button>
        </div>

        {/* Upcoming Events Section */}
        <div className="mt-24">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl poppin mb-10 font-semibold text-gray-800">
              Upcoming Events
            </h2>
          </div>

          {/* Event Cards or Skeletons */}
          <div className="grid grid-cols-1  gap-6 mt-4">
            {loadingEvents
              ? Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : events.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                  >
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-96 object-cover"
                    />
                    <h1>{event.title}</h1>
                  </motion.div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Event_Home;
