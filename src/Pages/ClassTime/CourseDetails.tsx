import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_api_url;

const CourseDetails: React.FC = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/Course/${id}`);
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
  }, [id]);

  if (loading)
    return <p className="text-center text-gray-500 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        Course Details
      </h1>

      {/* Course Card */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{course.name}</h2>
        <p className="text-gray-600">📌 Code: {course.code}</p>

        {/* Faculty Info */}
        {course.faculty && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Instructor:</h3>
            <p className="text-gray-700">{course.faculty.name}</p>
          </div>
        )}

        {/* Class Schedules */}
        {course.classSchedules && course.classSchedules.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Class Schedule:</h3>
            <ul className="list-disc ml-4 text-gray-700">
              {course.classSchedules.map((schedule: any, index: number) => (
                <li key={index}>
                  📅 {schedule.day} - 🕒 {schedule.time} @ {schedule.location}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Exam Schedules */}
        {course.examSchedules && course.examSchedules.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Exam Schedule:</h3>
            <ul className="list-disc ml-4 text-gray-700">
              {course.examSchedules.map((exam: any, index: number) => (
                <li key={index}>
                  📅 {exam.date} - 📍 {exam.location}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseDetails;
