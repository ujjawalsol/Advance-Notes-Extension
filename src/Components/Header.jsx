// Header.jsx
import React from 'react';

const Header = ({ darkMode, toggleDarkMode }) => {
    return (
        <div className="flex justify-between items-center w-full max-w-7xl mb-8">
            <h1 className="text-2xl md:text-4xl font-bold tracking-wide font-poppins text-center flex-grow">
                Note it
            </h1>

            <div className="relative ml-auto">
                <input
                    type="checkbox"
                    id="dark-mode-toggle"
                    className="sr-only"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                />
                <label
                    htmlFor="dark-mode-toggle"
                    className={`block w-14 h-8 rounded-full ${darkMode ? 'bg-blue-600' : 'bg-gray-300'} cursor-pointer transition-colors duration-300 relative`}
                >
                    <span
                        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${darkMode ? 'transform translate-x-6' : ''}`}
                    ></span>
                </label>
            </div>
        </div>
    );
};

export default Header;
