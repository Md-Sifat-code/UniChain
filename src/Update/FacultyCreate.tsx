import React, { useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_api_url;

const FacultyCreate: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    officeHours: "",
    image: null as File | null,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("phone", formData.phone);
    submitData.append("department", formData.department);
    submitData.append("officeHours", formData.officeHours);
    if (formData.image) submitData.append("image", formData.image);

    try {
      const response = await fetch(`${API_BASE_URL}/Faculty/create/add`, {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) throw new Error("Failed to add faculty");

      alert("Faculty added successfully!");
      navigate("/class");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mx-auto p-6">
      <Link className="text-2xl text-blue-800" to={"/home"}><IoArrowBackCircle /></Link>
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        Add Faculty
      </h1>

      {error && <p className="text-center text-red-500">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg"
      >
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md mb-3"
        />

        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md mb-3"
        />

        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md mb-3"
        />

        <label className="block text-sm font-medium text-gray-700">
          Department
        </label>
        <input
          type="text"
          name="department"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md mb-3"
        />

        <label className="block text-sm font-medium text-gray-700">
          Office Hours
        </label>
        <input
          type="text"
          name="officeHours"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md mb-3"
        />

        <label className="block text-sm font-medium text-gray-700">
          Profile Image
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          required
          className="w-full p-2 border rounded-md mb-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Add Faculty"}
        </button>
      </form>
    </section>
  );
};

export default FacultyCreate;
