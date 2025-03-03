import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_api_url;

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "", // Institution ID is sent as username
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character."
      );
      return;
    }

    setError(""); // Clear errors
    setLoading(true); // Show spinner

    // Create FormData and ensure all data is sent as text
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username.toString());
    formDataToSend.append("email", formData.email.toString());
    formDataToSend.append("password", formData.password.toString());

    try {
      const response = await fetch(`${API_BASE_URL}/User/add`, {
        method: "POST",
        body: formDataToSend, // Send as FormData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed.");
      }

      alert("Signup successful!");
      navigate("/verification", { state: { email: formData.email } }); // Pass email to Verification page
    } catch (err: any) {
      setError(err.message);
      navigate("/verification", { state: { email: formData.email } }); // Even on error, navigate with email
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgland">
      <div className="bg-white shadow-lg shadow-blue-100 rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center poppin text-gray-800 mb-6">
          <span className="uppercase iceland text-4xl text-blue-700">
            uni<span className="text-6xl text-amber-500">c</span>hain
          </span>
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Institution ID (Username) */}
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              name="username"
              placeholder="Institution ID"
              className="w-full outline-none bg-transparent"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full outline-none bg-transparent"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full outline-none bg-transparent"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bgbutton text-white font-semibold py-2 rounded-md hover:opacity-90 transition flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin mr-2" /> : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <Link to={"/"} className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
