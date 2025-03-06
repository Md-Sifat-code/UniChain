import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_api_url;

const CourseCreate: React.FC = () => {
  const { facultyId } = useParams(); // Get facultyId from URL
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    name: "",
    code: "",
    facultyId: facultyId || "", // Ensure it's not null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/Course/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) throw new Error("Failed to create course");

      alert("Course added successfully!");
      navigate(`/class/${facultyId}`); // Redirect back to faculty courses
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Add New Course</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Course Name
          </label>
          <input
            type="text"
            name="name"
            value={courseData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Course Code
          </label>
          <input
            type="text"
            name="code"
            value={courseData.code}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Course
        </button>
      </form>
    </section>
  );
};

export default CourseCreate;
