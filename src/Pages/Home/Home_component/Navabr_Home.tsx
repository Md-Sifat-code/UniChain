import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navabr_Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <section>
      <div className="flex flex-row justify-between items-center px-6 py-4  ">
        {/* Logo */}
        <div>
          <span className="uppercase font-bold iceland text-4xl text-blue-700">
            uni<span className="text-6xl text-amber-500">c</span>hain
          </span>
        </div>

        {/* User Icon with Dropdown Menu */}
        <div className="relative mt-4 sm:mt-0" ref={dropdownRef}>
          <FaUserCircle
            className="text-4xl text-gray-700 cursor-pointer hover:text-blue-600 transition"
            onClick={toggleDropdown}
          />

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden">
              <ul className="text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Dashboard
                </li>
                <li className="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer">
                  Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navabr_Home;
