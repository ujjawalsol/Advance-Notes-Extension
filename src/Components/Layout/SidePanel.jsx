import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaFileAlt, FaCode, FaVideo, FaImage, FaFile, FaLink } from 'react-icons/fa';

const SidePanel = ({ isOpen, togglePanel }) => {
  return (
    <>
      {/* Overlay for dimming background when the panel is open */}
      {isOpen && (
        <div
          onClick={togglePanel}
          className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300"
        />
      )}
      <div
        className={`z-20 fixed top-1/4 left-0 rounded-lg shadow-2xl py-6 px-3 space-y-6 transition-all duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white text-gray-800 dark:bg-gray-900 dark:text-white`}
        style={{ width: '60px' }}
      >
        {/* Navigation Icons */}
        <nav className="flex flex-col space-y-4">
          <Link to="/" onClick={togglePanel} className="group relative flex items-center justify-center cursor-pointer">
            <FaHome className="h-6 w-6 transition-transform transform hover:scale-110 text-indigo-600 dark:text-indigo-400" />
            <span className="absolute left-16 w-28 transition-opacity duration-300 rounded-md px-2 py-1 text-sm hidden group-hover:opacity-100 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white">
              Home
            </span>
          </Link>
          <Link to="/blank" onClick={togglePanel} className="group relative flex items-center justify-center cursor-pointer">
            <FaFileAlt className="h-6 w-6 transition-transform transform hover:scale-110 text-indigo-600 dark:text-indigo-400" />
            <span className="absolute left-16 w-28 transition-opacity duration-300 rounded-md px-2 py-1 text-sm hidden group-hover:opacity-100 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white">
              Blank Page
            </span>
          </Link>
          <Link to="/video" onClick={togglePanel} className="group relative flex items-center justify-center cursor-pointer">
            <FaVideo className="h-6 w-6 transition-transform transform hover:scale-110 text-red-600 dark:text-red-400" />
            <span className="absolute left-16 w-28 transition-opacity duration-300 rounded-md px-2 py-1 text-sm hidden group-hover:opacity-100 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white">
              Video Storage
            </span>
          </Link>
          <Link to="/image" onClick={togglePanel} className="group relative flex items-center justify-center cursor-pointer">
            <FaImage className="h-6 w-6 transition-transform transform hover:scale-110 text-green-600 dark:text-green-400" />
            <span className="absolute left-16 w-28 transition-opacity duration-300 rounded-md px-2 py-1 text-sm hidden group-hover:opacity-100 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white">
              Image Storage
            </span>
          </Link>
          <Link to="/code" onClick={togglePanel} className="group relative flex items-center justify-center cursor-pointer">
            <FaCode className="h-6 w-6 transition-transform transform hover:scale-110 text-purple-600 dark:text-purple-400" />
            <span className="absolute left-16 w-28 transition-opacity duration-300 rounded-md px-2 py-1 text-sm hidden group-hover:opacity-100 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white">
              Code Storage
            </span>
          </Link>
          <Link to="/other" onClick={togglePanel} className="group relative flex items-center justify-center cursor-pointer">
            <FaFile className="h-6 w-6 transition-transform transform hover:scale-110 text-yellow-600 dark:text-yellow-400" />
            <span className="absolute left-16 w-28 transition-opacity duration-300 rounded-md px-2 py-1 text-sm hidden group-hover:opacity-100 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white">
              Other Files
            </span>
          </Link>
          <Link to="/link" onClick={togglePanel} className="group relative flex items-center justify-center cursor-pointer">
            <FaLink className="h-6 w-6 transition-transform transform hover:scale-110 text-blue-600 dark:text-blue-400" />
            <span className="absolute left-16 w-28 transition-opacity duration-300 rounded-md px-2 py-1 text-sm hidden group-hover:opacity-100 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white">
              Links
            </span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default SidePanel;
