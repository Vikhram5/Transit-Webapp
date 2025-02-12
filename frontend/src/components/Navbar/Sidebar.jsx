import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false); 
  return (
    <>
      <div className="fixed top-0 left-0 z-40">
        <button
          className="p-2 md:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <svg
            className="w-8 h86 text-gray-500 transition-colors duration-300 ease-in-out transform hover:text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            ></path>
          </svg>
        </button>
      </div>
      <div
        className={`fixed flex flex-col top-0 left-0 h-full w-80 bg-blue-200 border-r dark:bg-gray-800 dark:border-gray-600 md:relative md:translate-x-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-center h-14 border-b dark:border-gray-600">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
            MTC Chennai
          </h1>
    
  
        </div>
        <nav className="flex-grow overflow-y-auto">
          <ul className="mt-7">
            <li className="px-7 py-2">
              <Link
                to="/dashboard"
                className="block text-lg text-gray-600 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 px-3 py-2 rounded-md"
                onClick={closeSidebar} // Close sidebar when link is clicked
              >
                Dashboard
              </Link>
            </li>
            <li className="px-7 py-2">
              <Link
                to="/buscount"
                className="block text-lg text-gray-600 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 px-3 py-2 rounded-md"
                onClick={closeSidebar} // Close sidebar when link is clicked
              >
                Bus Count
              </Link>
            </li>
            <li className="px-7 py-2">
              <Link
                to="/passcount"
                className="block text-lg text-gray-600 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 px-3 py-2 rounded-md"
                onClick={closeSidebar} // Close sidebar when link is clicked
              >
                TimeTable
              </Link>
            </li>
            <li className="px-7 py-2">
              <Link
                to="/revenue"
                className="block text-lg text-gray-600 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 px-3 py-2 rounded-md"
                onClick={closeSidebar} // Close sidebar when link is clicked
              >
                Revenue Analysis
              </Link>
            </li>
            <li className="px-7 py-2">
              <Link
                to="/loadingprofile"
                className="block text-lg text-gray-600 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 px-3 py-2 rounded-md"
                onClick={closeSidebar} // Close sidebar when link is clicked
              >
                Loading Profile
              </Link>
            </li>
            <li className="px-7 py-2">
              <Link
                to="/odmatrix"
                className="block text-lg text-gray-600 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 px-3 py-2 rounded-md"
                onClick={closeSidebar} // Close sidebar when link is clicked
              >
                OD Matrix
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
