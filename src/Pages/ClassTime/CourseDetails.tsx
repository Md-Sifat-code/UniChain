import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useUser } from "../../Authentication/Context_auth/UserContext";
import { FaTrash, FaPlus } from "react-icons/fa"; // Import icons

const API_BASE_URL = import.meta.env.VITE_api_url;

const CourseDetails: React.FC = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate(); // For navigation
  const [course, setCourse] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  // Check if user is an admin
  const isAdmin = user?.roles?.some(
    (role: { roleType: string }) => role.roleType === "ADMIN"
  );

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/Course/${courseId}`);
        if (!response.ok) throw new Error("Failed to fetch course details");
        const data = await response.json();
        setCourse(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleDelete = async (
    type: "classSchedule" | "examSchedule" | "assignment",
    itemId: string
  ) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(`${API_BASE_URL}/${type}/${itemId}`, {
        method: "DELETE",
      });

      setCourse((prevCourse: any) => ({
        ...prevCourse,
        [type === "classSchedule"
          ? "classSchedules"
          : type === "examSchedule"
          ? "examSchedules"
          : "assignments"]: prevCourse[
          type === "classSchedule"
            ? "classSchedules"
            : type === "examSchedule"
            ? "examSchedules"
            : "assignments"
        ].filter((item: any) => item.id !== itemId),
      }));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        Course Details
      </h1>

      {/* Course Card */}
      <div className="bg-white flex flex-col md:flex-row justify-between shadow-lg rounded-xl border border-gray-200 p-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{course.name}</h2>
          <p className="text-gray-600">📌 Code: {course.code}</p>

          {course.faculty && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Instructor:</h3>
              <p className="text-gray-700">{course.faculty.name}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {isAdmin && (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition"
              onClick={() => navigate(`/class/course/addclass/${courseId}`)}
            >
              <FaPlus className="mr-2" /> Add Class
            </button>
          )}
          {isAdmin && (
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-red-700 transition"
              onClick={() => navigate(`/class/course/addexam/${courseId}`)} // ✅ Added Navigation
            >
              <FaPlus className="mr-2" /> Add Exam
            </button>
          )}
          {isAdmin && (
            <button
              className="bg-yellow-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-yellow-700 transition"
              onClick={() =>
                navigate(`/class/course/addassignment/${courseId}`)
              }
            >
              <FaPlus className="mr-2" /> Add Assignment
            </button>
          )}
        </div>
      </div>

      {/* Class Schedule */}
      {course.classSchedules && course.classSchedules.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              📅 Class Schedule
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {course.classSchedules.map((schedule: any) => (
              <div
                key={schedule.id}
                className="bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-sm relative"
              >
                <p className="text-lg font-medium text-gray-800">
                  🕒 {schedule.time}
                </p>
                <p className="text-gray-600">📍 {schedule.location}</p>
                <p className="text-gray-500">📅 {schedule.day}</p>

                {isAdmin && (
                  <button
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition"
                    onClick={() => handleDelete("classSchedule", schedule.id)}
                  >
                    <FaTrash size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {course.examSchedules && course.examSchedules.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              📝 Exam Schedule
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {course.examSchedules.map((exam: any) => (
              <div
                key={exam.id}
                className="bg-red-50 p-4 rounded-lg border border-red-200 shadow-sm flex flex-col justify-between h-32 relative"
              >
                <div>
                  <p className="text-lg font-medium text-gray-800">
                    📆 {exam.date}
                  </p>
                  <p className="text-gray-600">📍 {exam.location}</p>
                </div>

                {/* Delete Button (Only for Admins) */}
                {isAdmin && (
                  <button
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition"
                    onClick={() => handleDelete("examSchedule", exam.id)}
                  >
                    <FaTrash size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Assignments */}
      {course.assignments && course.assignments.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              📖 Assignments
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {course.assignments.map((assignment: any) => (
              <div
                key={assignment.id}
                className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 shadow-sm flex flex-col relative"
              >
                <img
                  src={assignment.image}
                  alt={assignment.title}
                  className="rounded-md w-full h-24 object-cover"
                />
                <p className="text-lg font-medium text-gray-800 mt-2 truncate">
                  {assignment.title}
                </p>
                <p className="text-gray-600 text-sm">
                  📅 Due: {assignment.dueDate}
                </p>

                {isAdmin && (
                  <button
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition"
                    onClick={() => handleDelete("assignment", assignment.id)}
                  >
                    <FaTrash size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default CourseDetails;
