import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_api_url;

const AddAssignment: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    dueDate: "",
    status: "Open",
    image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        image: (e.target as HTMLInputElement).files?.[0] || null,
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("dueDate", formData.dueDate);
    data.append("status", formData.status);
    data.append("courseId", courseId || "");
    if (formData.image) data.append("image", formData.image);

    try {
      await fetch(`${API_BASE_URL}/Assignment/create/add`, {
        method: "POST",
        body: data,
      });
      navigate(`/class/course_details/${courseId}`);
    } catch (error) {
      console.error("Error adding assignment:", error);
    }
  };

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add Assignment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <input
          type="date"
          name="dueDate"
          required
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <input
          type="file"
          name="image"
          required
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Add Assignment
        </button>
      </form>
    </section>
  );
};

export default AddAssignment;
//okk
