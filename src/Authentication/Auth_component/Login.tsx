import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bgland">
      <div className="bg-white shadow-2xl shadow-blue-100 rounded-lg p-8 w-full max-w-md">
        <h2 className="text-4xl iceland font-semibold text-center text-gray-800 mb-6">
          {" "}
          WELCOME TO
          <span className=" uppercase iceland text-4xl px-2 text-blue-700">
            uni<span className="text-6xl text-amber-500">c</span>hain
          </span>
        </h2>

        <form className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded-md p-2 focus-within:border-bgbutton">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Institution ID"
              className="w-full outline-none bg-transparent"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md p-2 focus-within:border-bgbutton">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none bg-transparent"
            />
          </div>
          <div className="text-start text-sm text-gray-600 mt-1">
            <Link to="#" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button className="w-full bgbutton text-white font-semibold py-2 rounded-md hover:opacity-90 transition">
            Login
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
