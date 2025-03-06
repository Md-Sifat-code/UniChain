import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_api_url;

const AddClass: React.FC = () => {
  const { courseId } = useParams(); // Get courseId from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    day: "",
    time: "",
    location: "",
    reminderTime: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${API_BASE_URL}/ClassSchedule/create`, {
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
          reminderTime: {
            hour: +formData.reminderTime.split(":")[0],
            minute: +formData.reminderTime.split(":")[1],
            second: 0,
            nano: 0,
          },
          courseId: Number(courseId),
        }),
      });
      navigate(`/class/course_details/${courseId}`); // Redirect back to course details
    } catch (error) {
      console.error("Error adding class:", error);
    }
  };

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add Class Schedule</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="day"
          required
          className="w-full p-2 border rounded"
          onChange={handleChange}
        >
          <option value="">Select Day</option>
          {[
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
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
        <input
          type="time"
          name="reminderTime"
          required
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Class
        </button>
      </form>
    </section>
  );
};

export default AddClass;
