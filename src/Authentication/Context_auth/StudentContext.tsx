import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "../Context_auth/UserContext";

interface StudentContextType {
  student: any;
  fetchStudentDetails: () => Promise<void>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [student, setStudent] = useState<any>(null);

  const fetchStudentDetails = async () => {
    if (!user || !user.student) {
      console.error("User or student ID not found.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_api_url}/student/${user.student.id}`
      );
      if (!response.ok) throw new Error("Failed to fetch student details");

      const data = await response.json();
      console.log("Fetched student details:", data);
      setStudent(data);
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  useEffect(() => {
    if (user) fetchStudentDetails();
  }, [user]);

  return (
    <StudentContext.Provider value={{ student, fetchStudentDetails }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context)
    throw new Error("useStudent must be used within a StudentProvider");
  return context;
};
