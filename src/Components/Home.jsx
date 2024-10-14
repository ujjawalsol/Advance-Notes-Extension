import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false); // State for dark mode

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-[#F9FAFB] text-slate-900'} flex flex-col items-center p-8 transition-colors duration-300`}>

            {/* Header */}
            <div className="flex justify-between items-center w-full max-w-7xl mb-10">
                <h1 className="text-4xl font-bold tracking-wide font-poppins text-center flex-grow">
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

            {/* Note boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
                {/* Blank Page */}
                <div
                    className={`p-8 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center 
          ${darkMode ? 'bg-gradient-to-r from-indigo-900 to-indigo-700 border-indigo-600' : 'bg-gradient-to-r from-indigo-100 to-indigo-50 border-indigo-200'}`}
                    onClick={() => navigate('/blank')}
                >
                    <div className={`w-16 h-16 flex items-center justify-center rounded-full ${darkMode ? 'bg-indigo-400' : 'bg-indigo-600'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">Blank Page</h2>
                    <p className={`text-center ${darkMode && 'text-slate-400'}`}>Create and edit documents with full formatting.</p>
                </div>

                {/* Video Storage */}
                <div
                    className={`p-8 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center 
          ${darkMode ? 'bg-gradient-to-r from-red-900 to-red-700 border-red-600' : 'bg-gradient-to-r from-red-100 to-red-50 border-red-200'}`}
                    onClick={() => navigate('#')}
                >
                    <div className={`w-20 h-20 flex items-center justify-center rounded-full ${darkMode ? 'bg-red-400' : 'bg-red-600'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8v8l7-4-7-4" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">Video Storage</h2>
                    <p className={`text-center ${darkMode && 'text-slate-400'}`}>Store and manage your video files.</p>
                </div>

                {/* Image Storage */}
                <div
                    className={`p-8 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center 
          ${darkMode ? 'bg-gradient-to-r from-green-900 to-green-700 border-green-600' : 'bg-gradient-to-r from-green-100 to-green-50 border-green-200'}`}
                    onClick={() => navigate('#')}
                >
                    <div className={`w-16 h-16 flex items-center justify-center rounded-full ${darkMode ? 'bg-green-400' : 'bg-green-600'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4-4 4 4 4-4 4 4V4H4v12z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">Image Storage</h2>
                    <p className={`text-center ${darkMode && 'text-slate-400'}`}>Store and organize your images.</p>
                </div>

                {/* Code Storage */}
                <div
                    className={`p-8 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center 
          ${darkMode ? 'bg-gradient-to-r from-purple-900 to-purple-700 border-purple-600' : 'bg-gradient-to-r from-purple-100 to-purple-50 border-purple-200'}`}
                    onClick={() => navigate('#')}
                >
                    <div className={`w-16 h-16 flex items-center justify-center rounded-full ${darkMode ? 'bg-purple-400' : 'bg-purple-600'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 18l4-4-4-4m-8 8l-4-4 4-4" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">Code Space</h2>
                    <p className={`text-center ${darkMode && 'text-slate-400'}`}>Store your code with syntax highlighting.</p>
                </div>

                {/* Other Files */}
                <div
                    className={`p-8 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center ${darkMode ? 'bg-gradient-to-r from-yellow-900 to-yellow-700 border-yellow-600' : 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-200'}`}
                    onClick={() => navigate('#')}
                >
                    <div className={`w-16 h-16 flex items-center justify-center rounded-full ${darkMode ? 'bg-yellow-400' : 'bg-yellow-600'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold mt-4">Other Files</h2>
                    <p className={`text-center ${darkMode && 'text-slate-400'}`}>Manage other types of files here.</p>
                </div>
            </div>


        </div>
    );
}

export default Home;
