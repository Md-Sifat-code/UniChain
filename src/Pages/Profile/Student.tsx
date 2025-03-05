import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useStudent } from "../../Authentication/Context_auth/StudentContext";
import logo from "/logos.png";
import {
  FaPhone,
  FaUniversity,
  FaBook,
  FaUsers,
  FaChartLine,
  FaEdit,
  FaArrowAltCircleLeft,
} from "react-icons/fa";
import { MdSchool, MdBatchPrediction, MdInterests } from "react-icons/md";

const Student: React.FC = () => {
  const { student } = useStudent();
  const navigate = useNavigate();

  if (!student) {
    return (
      <div className="text-center text-lg font-semibold mt-10">
        Loading student profile...
      </div>
    );
  }

  return (
    <motion.section
      className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-lg flex flex-col min-h-screen justify-center rounded-lg border border-gray-200 h-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back Button */}
      <Link className="text-blue-800 text-2xl" to="/home">
        <FaArrowAltCircleLeft />
      </Link>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-2 bg-[#6F9EF6] text-white p-4 sm:p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row items-center space-x-4 sm:space-x-6">
          <motion.img
            src={logo}
            alt={student.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-lg"
            whileHover={{ scale: 1.1 }}
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              {student.name}
            </h1>
            <p className="text-lg opacity-90">
              {student.department} - {student.major}
            </p>
          </div>
        </div>

        {/* Update Profile Button */}
        <button
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg flex items-center gap-2 transition text-sm sm:text-base"
          onClick={() => navigate("/home/profile/update")}
        >
          <FaEdit /> Update Profile
        </button>
      </div>

      {/* Profile Details */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        <InfoCard
          icon={<FaPhone />}
          title="Phone Number"
          value={student.phoneNumber}
        />
        <InfoCard
          icon={<FaUniversity />}
          title="Department"
          value={student.department}
        />
        <InfoCard icon={<FaBook />} title="Major" value={student.major} />
        <InfoCard
          icon={<MdBatchPrediction />}
          title="Batch"
          value={student.batch}
        />
        <InfoCard
          icon={<MdSchool />}
          title="Semester"
          value={student.semester}
        />
        <InfoCard icon={<FaChartLine />} title="CGPA" value={student.cgpa} />
      </div>

      {/* Interests & Future Plans (Full Width on Mobile, Side by Side on Larger Screens) */}
      <div className="mt-6 grid grid-cols-1 gap-6">
        <motion.div
          className="shadow-md p-4 sm:p-6 rounded-lg bg-gray-50 w-full"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex flex-row gap-2 text-blue-800 items-center text-lg sm:text-xl mb-2">
            <MdInterests />
            <h2 className="font-semibold text-gray-800">Interests</h2>
          </div>
          <p className="text-sm sm:text-lg text-gray-800">
            {student.interests}
          </p>
        </motion.div>

        <motion.div
          className="shadow-md p-4 sm:p-6 rounded-lg bg-gray-50 w-full"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex flex-row gap-2 text-blue-800 items-center text-lg sm:text-xl mb-2">
            <FaUsers />
            <h2 className="font-semibold text-gray-800">Future Plans</h2>
          </div>
          <p className="text-sm sm:text-lg text-gray-800">
            {student.futurePlans}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Reusable Card Component for Details
const InfoCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
}> = ({ icon, title, value }) => {
  return (
    <motion.div
      className="flex items-center p-4 sm:p-6 rounded-lg shadow-md bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
      whileHover={{ scale: 1.03 }}
    >
      <div className="text-blue-800 text-xl sm:text-2xl">{icon}</div>
      <div className="ml-3 sm:ml-4">
        <h3 className="text-xs sm:text-sm text-gray-500 font-semibold">
          {title}
        </h3>
        <p className="text-sm sm:text-lg font-medium text-gray-800">{value}</p>
      </div>
    </motion.div>
  );
};

export default Student;
