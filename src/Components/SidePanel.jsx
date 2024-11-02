import React, { useState } from 'react';
import { FaHome, FaFileAlt, FaVideo, FaImage, FaCode, FaFile, FaLink, FaTimes } from 'react-icons/fa';

const FloatingSidePanel = ({darkMode}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle panel visibility
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative z-20">
      {/* Custom Hamburger Icon */}
      <button
        onClick={togglePanel}
        className={`p-3 fixed top-4 left-4 rounded-full shadow-lg transition ${
          darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        {isOpen ? (
          <FaTimes className="h-6 w-6 text-indigo-500" />
        ) : (
          <div className="flex flex-col space-y-1">
            <div className={`h-1 w-6 ${darkMode ? 'bg-indigo-500' : 'bg-indigo-700'} transition-all duration-300`}></div>
            <div className={`h-1 w-6 ${darkMode ? 'bg-indigo-500' : 'bg-indigo-700'} transition-all duration-300`}></div>
            <div className={`h-1 w-6 ${darkMode ? 'bg-indigo-500' : 'bg-indigo-700'} transition-all duration-300`}></div>
          </div>
        )}
      </button>

      {/* Floating Side Panel */}
      <div
        className={`fixed top-1/4 left-0 rounded-lg shadow-2xl py-6 px-3 space-y-6 transition-all duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}
        style={{ width: '60px' }}
      >
        {/* Home Icon */}
        <div className="group relative flex items-center justify-center cursor-pointer">
          <FaHome
            className={`h-6 w-6 transition-transform transform hover:scale-110 ${
              darkMode ? 'text-indigo-400' : 'text-indigo-600'
            }`}
          />
          <span
            className={`absolute left-16 w-28 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md px-2 py-1 text-sm ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            Home
          </span>
        </div>

        {/* Blank Page Icon */}
        <div className="group relative flex items-center justify-center cursor-pointer">
          <FaFileAlt
            className={`h-6 w-6 transition-transform transform hover:scale-110 ${
              darkMode ? 'text-indigo-400' : 'text-indigo-600'
            }`}
          />
          <span
            className={`absolute left-16 w-28 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md px-2 py-1 text-sm ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            Blank Page
          </span>
        </div>

        {/* Video Storage Icon */}
        <div className="group relative flex items-center justify-center cursor-pointer">
          <FaVideo
            className={`h-6 w-6 transition-transform transform hover:scale-110 ${
              darkMode ? 'text-red-400' : 'text-red-600'
            }`}
          />
          <span
            className={`absolute left-16 w-28 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md px-2 py-1 text-sm ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            Video Storage
          </span>
        </div>

        {/* Image Storage Icon */}
        <div className="group relative flex items-center justify-center cursor-pointer">
          <FaImage
            className={`h-6 w-6 transition-transform transform hover:scale-110 ${
              darkMode ? 'text-green-400' : 'text-green-600'
            }`}
          />
          <span
            className={`absolute left-16 w-28 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md px-2 py-1 text-sm ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            Image Storage
          </span>
        </div>

        {/* Code Space Icon */}
        <div className="group relative flex items-center justify-center cursor-pointer">
          <FaCode
            className={`h-6 w-6 transition-transform transform hover:scale-110 ${
              darkMode ? 'text-purple-400' : 'text-purple-600'
            }`}
          />
          <span
            className={`absolute left-16 w-28 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md px-2 py-1 text-sm ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            Code Space
          </span>
        </div>

        {/* Other Files Icon */}
        <div className="group relative flex items-center justify-center cursor-pointer">
          <FaFile
            className={`h-6 w-6 transition-transform transform hover:scale-110 ${
              darkMode ? 'text-yellow-400' : 'text-yellow-600'
            }`}
          />
          <span
            className={`absolute left-16 w-28 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md px-2 py-1 text-sm ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            Other Files
          </span>
        </div>

        {/* Link Storage Icon */}
        <div className="group relative flex items-center justify-center cursor-pointer">
          <FaLink
            className={`h-6 w-6 transition-transform transform hover:scale-110 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}
          />
          <span
            className={`absolute left-16 w-28 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md px-2 py-1 text-sm ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            Link Storage
          </span>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-10 z-10"
          onClick={togglePanel}
        ></div>
      )}
    </div>
  );
};

export default FloatingSidePanel;
