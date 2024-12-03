import React, { useState } from 'react';
import SidePanel from './SidePanel';
import { FaMoon, FaTimes } from 'react-icons/fa';
import { AiFillSun } from 'react-icons/ai';

const Header = ({ darkMode, toggleDarkMode }) => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    // Toggle side panel visibility
    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 flex justify-between items-center w-full p-3 z-50 transition-all duration-300 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
                } shadow-md`}
        >
            {/* Overlay for background dimming */}
            {isPanelOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300"
                    onClick={togglePanel}
                />
            )}

            {/* Side Panel Button */}
            <button
                onClick={togglePanel}
                className={`p-3 rounded-full shadow-md transition relative z-30 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : isPanelOpen ? 'bg-white hover:bg-gray-300': 'bg-gray-200 hover:bg-gray-300'
                    } ${isPanelOpen ? '' : ''}`}  >
                {isPanelOpen ? (
                    <FaTimes className="h-5 w-6 text-indigo-400" />
                ) : (
                    <div className="flex flex-col space-y-1">
                        <div
                            className={`h-1 w-6 ${darkMode ? 'bg-indigo-500' : 'bg-indigo-700'
                                } transition-all duration-300`}
                        ></div>
                        <div
                            className={`h-1 w-6 ${darkMode ? 'bg-indigo-500' : 'bg-indigo-700'
                                } transition-all duration-300`}
                        ></div>
                        <div
                            className={`h-1 w-6 ${darkMode ? 'bg-indigo-500' : 'bg-indigo-700'
                                } transition-all duration-300`}
                        ></div>
                    </div>
                )}
            </button>

            {/* Side Panel */}
            <SidePanel className="relative z-20" darkMode={darkMode} isOpen={isPanelOpen} togglePanel={togglePanel} />

            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-semibold tracking-wide text-center flex-grow font-poppins relative">
                <span
                    className={`bg-clip-text text-transparent ${darkMode
                            ? 'bg-gradient-to-r from-indigo-300 to-purple-400'
                            : 'bg-gradient-to-r from-indigo-600 to-purple-700'
                        }`}
                >
                    Note It
                </span>
            </h1>

            {/* Dark Mode Toggle */}
            <div className="relative ml-auto flex items-center">
                <input
                    type="checkbox"
                    id="dark-mode-toggle"
                    className="sr-only"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                />
                <label
                    htmlFor="dark-mode-toggle"
                    className={`flex items-center w-14 h-8 rounded-full cursor-pointer transition-colors duration-300 ${darkMode ? 'bg-indigo-700 p-1' : 'bg-yellow-300'
                        } p-1`}
                >
                    <span
                        className={`flex items-center justify-center w-6 h-6 rounded-full shadow-md transition-transform duration-300 transform ${darkMode ? 'translate-x-6 bg-gray-900 rotate-180' : 'translate-x-0 bg-white rotate-0'
                            }`}
                    >
                        {darkMode ? (
                            <FaMoon className="text-indigo-400 rotate-180  w-4 h-4" />
                        ) : (
                            <AiFillSun className="text-yellow-500  w-4 h-4" />
                        )}
                    </span>
                </label>
            </div>

            {/* Subtle Divider Line */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </header>
    );
};

export default Header;