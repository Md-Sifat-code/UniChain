import React from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bgland">
      <div className="bg-white shadow-lg shadow-blue-100 rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center poppin text-gray-800 mb-6">
          <span className=" uppercase iceland text-4xl text-blue-700">
            uni<span className="text-6xl text-amber-500">c</span>hain
          </span>
        </h2>
        <form className="space-y-4">
          {/* Institution ID */}
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <FaUser className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Institution ID"
              className="w-full outline-none bg-transparent"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none bg-transparent"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none bg-transparent"
            />
          </div>

          {/* Submit Button */}
          <button className="w-full bgbutton text-white font-semibold py-2 rounded-md hover:opacity-90 transition">
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <Link to={"/"} className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
