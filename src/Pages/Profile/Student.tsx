import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import {
  FaPhone,
  FaUniversity,
  FaBook,
  FaUsers,
  FaChartLine,
  FaEdit,
} from "react-icons/fa";
import { MdSchool, MdBatchPrediction, MdInterests } from "react-icons/md";

// Sample student data
const initialStudent = {
  name: "John Doe",
  phoneNumber: "+1 234 567 890",
  department: "Computer Science",
  major: "Software Engineering",
  batch: "2021",
  semester: "6th",
  cgpa: "3.85",
  interests: "Artificial Intelligence, Web Development",
  futurePlans: "Become a Full-Stack Developer",
  profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
};

const Student: React.FC = () => {
  const [student] = useState(initialStudent);
  const navigate = useNavigate(); // Hook for navigation

  return (
    <motion.section
      className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Profile Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-800 to-blue-600 text-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-6">
          <motion.img
            src={student.profileImage}
            alt={student.name}
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
            whileHover={{ scale: 1.1 }}
          />
          <div>
            <h1 className="text-3xl font-semibold">{student.name}</h1>
            <p className="text-lg opacity-90">
              {student.department} - {student.major}
            </p>
          </div>
        </div>
        {/* Navigate to Update Profile Page */}
        <button
          className="btn btn-primary flex items-center gap-2"
          onClick={() => navigate("/home/profile/update")}
        >
          <FaEdit /> Update Profile
        </button>
      </div>

      {/* Profile Details */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <InfoCard
          icon={<MdInterests />}
          title="Interests"
          value={student.interests}
        />
        <InfoCard
          icon={<FaUsers />}
          title="Future Plans"
          value={student.futurePlans}
        />
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
      className="flex items-center p-6 border rounded-lg shadow-md bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
      whileHover={{ scale: 1.03 }}
    >
      <div className="text-blue-800 text-2xl">{icon}</div>
      <div className="ml-4">
        <h3 className="text-sm text-gray-500 font-semibold">{title}</h3>
        <p className="text-lg font-medium text-gray-800">{value}</p>
      </div>
    </motion.div>
  );
};

export default Student;
