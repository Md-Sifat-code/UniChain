import React, { useEffect } from "react";
import { useUser } from "../../../Authentication/Context_auth/UserContext";

const StudentAdd: React.FC = () => {
  const { user } = useUser();

  console.log("User:", user);

  useEffect(() => {
    console.log("User in useEffect:", user);
    if (!user) {
      console.log("Waiting for user data...");
      return; // Prevent running the request if user is not loaded
    }

    console.log("Checking student data:", user.student);

    const addStudentIfNotExists = async () => {
      if (user.student === null) {
        console.log("User has no student profile. Sending POST request...");

        try {
          const formData = new FormData();
          formData.append("name", "Default Name");
          formData.append("phoneNumber", "0000000000");
          formData.append("department", "Default Department");
          formData.append("major", "Default Major");
          formData.append("batch", "2025");
          formData.append("semester", "1");
          formData.append("cgpa", "0.00");
          formData.append("interests", "None");
          formData.append("futurePlans", "Undecided");
          formData.append("profileImage", "");
          formData.append("userId", user.id.toString());

          const response = await fetch(
            `${import.meta.env.VITE_api_url}/student/add`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (!response.ok) throw new Error("Failed to create student profile");

          console.log("Student profile created successfully!");
        } catch (error) {
          console.error("Error adding student profile:", error);
        }
      } else {
        console.log("User already has a student profile. No need to add.");
      }
    };

    addStudentIfNotExists();
  }, [user]);

  return <div>StudentAdd Component</div>;
};

export default StudentAdd;
