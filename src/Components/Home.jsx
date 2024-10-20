import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const noteData = [
    {
        id: 'blank',
        title: 'Blank Page',
        description: 'Create and update documents',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
        ),
        color: { dark: 'bg-indigo-400', light: 'bg-indigo-600' },
        gradient: { dark: 'from-indigo-900 to-indigo-700', light: 'from-indigo-100 to-indigo-50' },
    },
    {
        id: 'video',
        title: 'Video Storage',
        description: 'Store and manage your video files.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8v8l7-4-7-4" />
            </svg>
        ),
        color: { dark: 'bg-red-400', light: 'bg-red-600' },
        gradient: { dark: 'from-red-900 to-red-700', light: 'from-red-100 to-red-50' },
    },
    {
        id: 'image',
        title: 'Image Storage',
        description: 'Store and organize your images.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4-4 4 4 4-4 4 4V4H4v12z" />
            </svg>
        ),
        color: { dark: 'bg-green-400', light: 'bg-green-600' },
        gradient: { dark: 'from-green-900 to-green-700', light: 'from-green-100 to-green-50' },
    },
    {
        id: 'code',
        title: 'Code Space',
        description: 'Store your code with syntax highlighting.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 18l4-4-4-4m-8 8l-4-4 4-4" />
            </svg>
        ),
        color: { dark: 'bg-purple-400', light: 'bg-purple-600' },
        gradient: { dark: 'from-purple-900 to-purple-700', light: 'from-purple-100 to-purple-50' },
    },
    {
        id: 'other',
        title: 'Other Files',
        description: 'Store and organize other files easily.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
        ),
        color: { dark: 'bg-yellow-400', light: 'bg-yellow-600' },
        gradient: { dark: 'from-yellow-900 to-yellow-700', light: 'from-yellow-100 to-yellow-50' },
    },
];

function Home() {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-[#F9FAFB] text-slate-900'} flex flex-col items-center p-4 transition-colors duration-300`}>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            {/* Note boxes */}
            <div className="grid grid-cols-2 gap-4 md:gap-8 w-full max-w-7xl">
                {noteData.map((note) => (
                    <div
                        key={note.id}
                        className={`p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center 
                        ${darkMode ? `bg-gradient-to-r ${note.gradient.dark} border-${note.id}-600` : `bg-gradient-to-r ${note.gradient.light} border-${note.id}-200`}`}
                        onClick={() => {
                            switch (note.id) {
                                case 'blank':
                                    navigate('/blank');
                                    break;
                                case 'video':
                                    navigate('/video');
                                    break;
                                case 'image':
                                    navigate('/image');
                                    break;
                                case 'code':
                                    navigate('/code');
                                    break;
                                case 'other':
                                    navigate('/other');
                                    break;
                                default:
                                    navigate('/');
                            }
                        }}
                    >
                        <div className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full ${darkMode ? note.color.dark : note.color.light}`}>
                            {note.icon}
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold mt-4">{note.title}</h2>
                        <p className={`text-center ${darkMode ? 'text-slate-400' : ''}`}>{note.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
