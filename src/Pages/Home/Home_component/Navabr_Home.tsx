import React, { useState, useEffect, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../Authentication/Context_auth/UserContext";
import logo from "/logos.png";
const Navabr_Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useUser(); // Get user data from context

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout function
  const handleLogout = () => {
    sessionStorage.clear(); // Clear all stored session data
    navigate("/"); // Redirect to home
  };

  // Function to check user student status
  const handleProfileClick = async () => {
    if (!user) {
      console.error("User not found, please log in again.");
      return;
    }

    if (user.student === null) {
      console.log("User has no student profile. Creating one...");

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

        // Redirect to profile after creating student profile
        navigate("/home/student/profile");
      } catch (error) {
        console.error("Error adding student profile:", error);
      }
    } else {
      // If student profile exists, navigate directly
      navigate("/home/student/profile");
    }
  };

  return (
    <section>
      <div className="flex flex-row justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to={"/home"}>
          <span className="uppercase font-bold iceland text-4xl text-blue-700">
            uni<span className="text-6xl text-amber-500">c</span>hain
          </span>
        </Link>

        {/* User Icon with Dropdown Menu */}
        <div className="relative mt-4 sm:mt-0" ref={dropdownRef}>
          <img
            onClick={toggleDropdown}
            className="w-[50px] border border-blue-600 h-[50px] rounded-full cursor-pointer"
            src={logo}
            alt=""
          />

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden">
              <div className="flex flex-col">
                {/* Profile Link Triggers Student Profile Creation if Needed */}
                <button
                  onClick={handleProfileClick}
                  className="px-4 w-full py-2 text-left hover:bg-gray-100 cursor-pointer"
                >
                  Profile
                </button>
                <Link
                  to={
                    user?.roles?.some(
                      (role: { roleType: string }) => role.roleType === "ADMIN"
                    )
                      ? "/dashboard/admin"
                      : "/dashboard"
                  }
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Dashboard
                </Link>
                <Link className="px-4 py-2 hover:bg-gray-100 cursor-pointer" to={"/lostandfound"}>Lost&Found</Link>
                <Link className="px-4 py-2 hover:bg-gray-100 cursor-pointer" to={"/updateandannounce"}>Update&Announce</Link>
                <Link className="px-4 py-2 hover:bg-gray-100 cursor-pointer" to={"/location"}>Location</Link>
                {/* <Link className="px-4 py-2 hover:bg-gray-100 cursor-pointer" to={"/vrexp"}>OpenVR</Link> */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-left hover:bg-red-500 hover:text-white cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navabr_Home;
