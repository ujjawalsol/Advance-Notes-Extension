import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaVideo, FaImage, FaCode, FaFile, FaLink } from 'react-icons/fa';

const noteData = [
    {
        id: 'blank',
        title: 'Blank Page',
        description: 'Create and update documents',
        icon: <FaFileAlt className="h-6 w-6 sm:h-8 sm:w-8 text-white" />,
        color: 'bg-indigo-500 dark:bg-indigo-400',
        gradient: 'bg-gradient-to-r from-indigo-300 to-indigo-100 dark:from-indigo-900 dark:to-indigo-700',
    },
    {
        id: 'video',
        title: 'Video Storage',
        description: 'Store and manage your video files.',
        icon: <FaVideo className="h-6 w-6 sm:h-8 sm:w-8 text-white" />,
        color: 'bg-red-500 dark:bg-red-400',
        gradient: 'bg-gradient-to-r from-red-300 to-red-100 dark:from-red-900 dark:to-red-700',
    },
    {
        id: 'image',
        title: 'Image Storage',
        description: 'Store and organize your images.',
        icon: <FaImage className="h-6 w-6 sm:h-8 sm:w-8 text-white" />,
        color: 'bg-green-500 dark:bg-green-400',
        gradient: 'bg-gradient-to-r from-green-300 to-green-100 dark:from-green-900 dark:to-green-700',
    },
    {
        id: 'code',
        title: 'Code Space',
        description: 'Store your code with syntax highlighting.',
        icon: <FaCode className="h-6 w-6 sm:h-8 sm:w-8 text-white" />,
        color: 'bg-purple-500 dark:bg-purple-400',
        gradient: 'bg-gradient-to-r from-purple-300 to-purple-100 dark:from-purple-900 dark:to-purple-700',
    },
    {
        id: 'other',
        title: 'Other Files',
        description: 'Store and organize other files easily.',
        icon: <FaFile className="h-6 w-6 sm:h-8 sm:w-8 text-white" />,
        color: 'bg-yellow-500 dark:bg-yellow-400',
        gradient: 'bg-gradient-to-r from-yellow-300 to-yellow-100 dark:from-yellow-900 dark:to-yellow-700',
    },
    {
        id: 'link',
        title: 'Link Storage',
        description: 'Store and manage your web links.',
        icon: <FaLink className="h-6 w-6 sm:h-8 sm:w-8 text-white" />,
        color: 'bg-blue-500 dark:bg-blue-400',
        gradient: 'bg-gradient-to-r from-blue-300 to-blue-100 dark:from-blue-900 dark:to-blue-700',
    },
];

function Home() {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-2 gap-4 md:gap-8 w-full max-w-7xl">
            {noteData.map((note) => (
                <div
                    key={note.id}
                    className={`relative p-4 sm:p-6 md:p-8 rounded-xl shadow-lg transition-all duration-500 transform perspective-1000
                        hover:rotate-x-6 hover:-rotate-y-6 hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 cursor-pointer flex flex-col items-center
                        ${note.gradient}`}
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
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full ${note.color}`}>
                        {note.icon}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-semibold mt-4">{note.title}</h2>
                    <p className="text-center text-slate-800 dark:text-slate-400">{note.description}</p>
                </div>
            ))}
        </div>
    );
}

export default Home;
