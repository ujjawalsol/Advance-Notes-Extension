import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaVideo, FaImage, FaCode, FaFile, FaLink } from 'react-icons/fa';

const noteData = [
    {
        id: 'blank',
        title: 'Blank Page',
        description: 'Create and update documents',
        icon: <FaFileAlt className="h-6 w-6 sm:h-8 sm:w-8 text-white" />,
        color: { dark: 'bg-indigo-400', light: 'bg-indigo-500' },
        gradient: { dark: 'from-indigo-900 to-indigo-700', light: 'from-indigo-300 to-indigo-100' },
    },
    {
        id: 'video',
        title: 'Video Storage',
        description: 'Store and manage your video files.',
        icon: <FaVideo className="h-6 w-6 sm:h-8 sm:w-8 text-white" />,
        color: { dark: 'bg-red-400', light: 'bg-red-500' },
        gradient: { dark: 'from-red-900 to-red-700', light: 'from-red-300 to-red-100' },
    },
    {
        id: 'image',
        title: 'Image Storage',
        description: 'Store and organize your images.',
        icon: <FaImage className="h-6 w-6 sm:h-8 sm:w-8 text-white" />,
        color: { dark: 'bg-green-400', light: 'bg-green-500' },
        gradient: { dark: 'from-green-900 to-green-700', light: 'from-green-300 to-green-100' },
    },
    {
        id: 'code',
        title: 'Code Space',
        description: 'Store your code with syntax highlighting.',
        icon: <FaCode className="h-6 w-6 sm:h-8 sm:w-8 text-white" />,
        color: { dark: 'bg-purple-400', light: 'bg-purple-500' },
        gradient: { dark: 'from-purple-900 to-purple-700', light: 'from-purple-300 to-purple-100' },
    },
    {
        id: 'other',
        title: 'Other Files',
        description: 'Store and organize other files easily.',
        icon: <FaFile className="h-6 w-6 sm:h-8 sm:w-8 text-white" />,
        color: { dark: 'bg-yellow-400', light: 'bg-yellow-500' },
        gradient: { dark: 'from-yellow-900 to-yellow-700', light: 'from-yellow-300 to-yellow-100' },
    },
    {
        id: 'link',
        title: 'Link Storage',
        description: 'Store and manage your web links.',
        icon: <FaLink className="h-6 w-6 sm:h-8 sm:w-8 text-white" />,
        color: { dark: 'bg-blue-400', light: 'bg-blue-500' },
        gradient: { dark: 'from-blue-900 to-blue-700', light: 'from-blue-300 to-blue-100' },
    },
];

function Home({darkMode, toggleDarkMode}) {
    const navigate = useNavigate();

    return (
        <div className='grid grid-cols-2 gap-4 md:gap-8 w-full max-w-7xl'>
            {noteData.map((note) => (
                <div
                    key={note.id}
                    className={`relative p-4 sm:p-6 md:p-8 rounded-xl shadow-lg transition-all duration-500 transform perspective-1000
                        hover:rotate-x-6 hover:-rotate-y-6 hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 cursor-pointer flex flex-col items-center
                        ${darkMode ? `bg-gradient-to-r ${note.gradient.dark}` : `bg-gradient-to-r ${note.gradient.light}`}`}
                    onClick={() => {
                        switch (note.id) {
                            case 'blank': navigate('/blank'); break;
                            case 'video': navigate('/video'); break;
                            case 'image': navigate('/image'); break;
                            case 'code': navigate('/code'); break;
                            case 'other': navigate('/other'); break;
                            case 'link': navigate('/link'); break;
                            default: navigate('/');
                        }
                    }}
                    style={{
                        transformStyle: 'preserve-3d',
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

    );
}

export default Home;
