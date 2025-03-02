import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorElement: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-red-700 bg-red-100 p-6">
      <FaExclamationTriangle className="text-6xl mb-4" />
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-lg">
        An unexpected error occurred. Please try again later.
      </p>
    </div>
  );
};

export default ErrorElement;
