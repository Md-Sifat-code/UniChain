import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useUser } from "../../Authentication/Context_auth/UserContext";
import { IoArrowBackCircle } from "react-icons/io5";

const API_BASE_URL = import.meta.env.VITE_api_url;

const Course: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser(); // Get user details from context
  const isAdmin = user?.roles?.some(
    (role: { roleType: string }) => role.roleType === "ADMIN"
  );

  useEffect(() => {
    const fetchFacultyDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/Faculty/${id}`);
        if (!response.ok) throw new Error("Failed to fetch faculty details");
        const data = await response.json();
        setFaculty(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyDetails();
  }, [id]);

  if (loading)
    return <p className="text-center text-gray-500 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="container mx-auto p-6">
      <Link className="text-2xl text-blue-800" to={"/class"}><IoArrowBackCircle /></Link>
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        Faculty Details
      </h1>

      {/* Faculty Card */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 p-6 mb-8">
        <div className="flex flex-col items-center">
          <img
            src={faculty.image}
            alt={faculty.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-gray-300"
          />
          <h2 className="text-2xl font-semibold mt-4 text-gray-900">
            {faculty.name}
          </h2>
          <p className="text-gray-600 text-lg">{faculty.department}</p>
          <p className="text-sm mt-2 text-gray-500">
            🕒 Office Hours: {faculty.officeHours}
          </p>
          <div className="mt-4 text-center">
            <p className="text-sm font-medium text-gray-700">Contact:</p>
            <p className="text-sm text-gray-600">📧 {faculty.email}</p>
            <p className="text-sm text-gray-600">📞 {faculty.phone}</p>
            <div className="flex flex-row gap-6">
            {isAdmin && (
              <button
                onClick={() => navigate(`/class/course/create/${id}`)} // Navigate to CourseCreate
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add Course
              </button>
            )}
            <button
              onClick={() => navigate(`/mail/${id}`)} // Navigate to Emailme component
              className="mt-4  bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Mail Me
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {faculty.courses.length > 0 ? (
          faculty.courses.map((course: any) => (
            <div
              key={course.id}
              className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {course.name}
              </h3>
              <p className="text-gray-600">📌 Code: {course.code}</p>
              <button
                onClick={() => navigate(`/class/course_details/${course.id}`)}
                className="w-full px-12 py-3 bg-blue-500 mt-2 font-bold text-white rounded-lg hover:bg-blue-600 transition"
              >
                See Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No courses available.</p>
        )}
      </div>
    </section>
  );
};

export default Course;
