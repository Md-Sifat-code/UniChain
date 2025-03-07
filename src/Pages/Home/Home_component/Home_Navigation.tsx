import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaBus,
  FaUtensils,
  FaCalendarAlt,
  FaClipboardList,
} from "react-icons/fa";

const cards = [
  {
    title: "Bus Routes",
    icon: <FaBus />,
    color: "text-blue-500",
    bg: "bg-blue-100",
    link: "/bus",
  },
  {
    title: "Canteen",
    icon: <FaUtensils />,
    color: "text-green-500",
    bg: "bg-green-100",
    link: "/canteen",
  },
  {
    title: "Class Schedule",
    icon: <FaClipboardList />,
    color: "text-purple-500",
    bg: "bg-purple-100",
    link: "/class",
  },
  {
    title: "Event Management",
    icon: <FaCalendarAlt />,
    color: "text-red-500",
    bg: "bg-red-100",
    link: "/event",
  },
];

const Home_Navigation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="p-6 mt-12">
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(card.link)}
            className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-md cursor-pointer ${card.bg} transition-all`}
          >
            <div className={`text-5xl ${card.color} mb-4`}>{card.icon}</div>
            <h3 className="text-xl font-semibold text-gray-700">
              {card.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Home_Navigation;
