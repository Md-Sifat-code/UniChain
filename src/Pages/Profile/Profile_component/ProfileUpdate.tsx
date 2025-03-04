import React, { useState, useEffect } from "react";
import { useUser } from "../../../Authentication/Context_auth/UserContext";
import {
  FaUser,
  FaPhone,
  FaBuilding,
  FaBook,
  FaGraduationCap,
  FaLayerGroup,
  FaChartLine,
  FaLightbulb,
  FaBullseye,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Define type for form fields
type StudentFormData = {
  name: string;
  phoneNumber: string;
  department: string;
  major: string;
  batch: string;
  semester: string;
  cgpa: string;
  interests: string;
  futurePlans: string;
};

const ProfileUpdate: React.FC = () => {
  const { user } = useUser();
  console.log("User in ProfileUpdate:", user);
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<StudentFormData | null>(null);
  const [formData, setFormData] = useState<StudentFormData>({
    name: "",
    phoneNumber: "",
    department: "",
    major: "",
    batch: "",
    semester: "",
    cgpa: "",
    interests: "",
    futurePlans: "",
  });

  useEffect(() => {
    if (!user || !user.student) {
      console.error("User or student ID not found");
      return;
    }

    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_api_url}/student/${user.student.id}`
        );
        if (!response.ok) throw new Error("Failed to fetch student data");

        const data: StudentFormData = await response.json();
        console.log("Fetched student data:", data);
        setStudentData(data);

        setFormData({
          name: data.name || "",
          phoneNumber: data.phoneNumber || "",
          department: data.department || "",
          major: data.major || "",
          batch: data.batch || "",
          semester: data.semester || "",
          cgpa: data.cgpa || "",
          interests: data.interests || "",
          futurePlans: data.futurePlans || "",
        });
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [user]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!user || !user.student || !studentData) {
      console.error("User, student ID, or existing data not found");
      return;
    }

    try {
      const updatedData = {
        name: formData.name || studentData.name,
        phoneNumber: formData.phoneNumber || studentData.phoneNumber,
        department: formData.department || studentData.department,
        major: formData.major || studentData.major,
        batch: formData.batch || studentData.batch,
        semester: formData.semester || studentData.semester,
        cgpa: formData.cgpa || studentData.cgpa,
        interests: formData.interests || studentData.interests,
        futurePlans: formData.futurePlans || studentData.futurePlans,
        userId: user.id, // ✅ Including userId as required by API
      };

      const response = await fetch(
        `${import.meta.env.VITE_api_url}/student/${user.student.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // ✅ Sending JSON
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedData), // ✅ Convert object to JSON string
        }
      );

      if (!response.ok) throw new Error("Failed to update student profile");

      console.log("Student profile updated successfully!");
      navigate("/home/student/profile"); // Redirect to profile after updating
    } catch (error) {
      console.error("Error updating student profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Update Profile
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {[
          { label: "Name", name: "name", icon: <FaUser />, type: "text" },
          {
            label: "Phone Number",
            name: "phoneNumber",
            icon: <FaPhone />,
            type: "text",
          },
          {
            label: "Department",
            name: "department",
            icon: <FaBuilding />,
            type: "text",
          },
          { label: "Major", name: "major", icon: <FaBook />, type: "text" },
          {
            label: "Batch",
            name: "batch",
            icon: <FaGraduationCap />,
            type: "text",
          },
          {
            label: "Semester",
            name: "semester",
            icon: <FaLayerGroup />,
            type: "text",
          },
          { label: "CGPA", name: "cgpa", icon: <FaChartLine />, type: "text" },
        ].map((field) => (
          <div key={field.name} className="relative">
            <label className="block text-gray-700 font-semibold mb-1">
              {field.label}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">
                {field.icon}
              </span>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.label}
                value={formData[field.name as keyof StudentFormData]}
                onChange={handleChange}
                className="pl-10 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        ))}

        {/* Text Areas */}
        {[
          { label: "Interests", name: "interests", icon: <FaLightbulb /> },
          { label: "Future Plans", name: "futurePlans", icon: <FaBullseye /> },
        ].map((field) => (
          <div key={field.name} className="relative">
            <label className="block text-gray-700 font-semibold mb-1">
              {field.label}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">
                {field.icon}
              </span>
              <textarea
                name={field.name}
                placeholder={field.label}
                value={formData[field.name as keyof StudentFormData]}
                onChange={handleChange}
                className="pl-10 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleUpdate}
        className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition font-semibold"
      >
        Update Profile
      </button>
    </div>
  );
};

export default ProfileUpdate;
