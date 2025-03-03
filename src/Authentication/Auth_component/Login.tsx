import React, { useState } from "react";
import { FaUser, FaLock, FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context_auth/AuthContext";
import { useUser } from "../Context_auth/UserContext";

const API_BASE_URL = import.meta.env.VITE_api_url;

const Login: React.FC = () => {
  const { login } = useAuth();
  const { fetchUserDetails } = useUser();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // POST request to /Log
      const response = await fetch(`${API_BASE_URL}/Log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();
      login(data.token, data.username, data.email, data.roles);

      // Fetch user details
      await fetchUserDetails(data.username, data.token);

      navigate("/home"); // Redirect after successful login
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bgland">
      <div className="bg-white shadow-2xl shadow-blue-100 rounded-lg p-8 w-full max-w-md">
        <h2 className="text-4xl iceland font-semibold text-center text-gray-800 mb-6">
          WELCOME TO
          <span className="uppercase iceland text-4xl px-2 text-blue-700">
            uni<span className="text-6xl text-amber-500">c</span>hain
          </span>
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center border border-gray-300 rounded-md p-2 focus-within:border-bgbutton">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              name="username"
              placeholder="Institution ID"
              className="w-full outline-none bg-transparent"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md p-2 focus-within:border-bgbutton">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="text"
              name="password"
              placeholder="Password"
              className="w-full outline-none bg-transparent"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bgbutton text-white font-semibold py-2 rounded-md hover:opacity-90 transition flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin mr-2" /> : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
