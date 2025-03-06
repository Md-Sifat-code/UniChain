import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_api_url;

const AddExam: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${API_BASE_URL}/ExamScheduler/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          time: {
            hour: +formData.time.split(":")[0],
            minute: +formData.time.split(":")[1],
            second: 0,
            nano: 0,
          },
          courseId: Number(courseId),
        }),
      });
      navigate(`/class/course_details/${courseId}`);
    } catch (error) {
      console.error("Error adding exam:", error);
    }
  };

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add Exam Schedule</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          name="date"
          required
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <input
          type="time"
          name="time"
          required
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          required
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Add Exam
        </button>
      </form>
    </section>
  );
};

export default AddExam;
