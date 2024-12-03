import React, { useState } from 'react';
import { BiPlus, BiSolidTrashAlt } from 'react-icons/bi';
import { MdEdit } from "react-icons/md";

const SavedNotes = ({ darkMode }) => {
    const defaultNotes = [
        {
            id: '1',
            title: 'First Note',
            content: 'This is the content of the first note.',
            createdAt: '2024-11-01T10:30:00',
            color: "#FF7E5F",
        },
        {
            id: '2',
            title: 'Second Note',
            content: 'This is a bit longer content for the second note to show truncation effect.',
            createdAt: '2024-11-02T14:20:00',
            color: "#FF7E5F",
        },
        {
            id: '3',
            title: 'Meeting Notes',
            content: 'Summary of the project meeting with tasks assigned to each team member.',
            createdAt: '2024-11-02T18:00:00',
            color: '#FF6A6A',
        },
        {
            id: '4',
            title: 'Shopping List',
            content: 'Items to buy for the weekend shopping trip.',
            createdAt: '2024-11-02T18:00:00',
            color: 'blue',
        },
        {
            id: '5',
            title: 'Travel Plans',
            content: 'Itinerary for the upcoming holiday trip to the mountains.',
            createdAt: '2024-11-02T18:00:00',
            color: 'green',
        },
        {
            id: '6',
            title: 'Recipe Ideas',
            content: 'List of recipes to try out this weekend.',
            createdAt: '2024-11-02T18:00:00',
            color: 'purple',
        },
        {
            id: '7',
            title: 'Recipe Ideas',
            content: 'List of recipes to try out this weekend.',
            createdAt: '2024-11-02T18:00:00',
            color: 'purple',
        },
        {
            id: '8',
            title: 'Recipe Ideas',
            content: 'List of recipes to try out this weekend.',
            createdAt: '2024-11-02T18:00:00',
            color: 'purple',
        },
        {
            id: '9',
            title: 'Recipe Ideas',
            content: 'List of recipes to try out this weekend.',
            createdAt: '2024-11-02T18:00:00',
            color: 'purple',
        },
        {
            id: '10',
            title: 'Recipe Ideas',
            content: 'List of recipes to try out this weekend.',
            createdAt: '2024-11-02T18:00:00',
            color: 'purple',
        },
    ];

    const [selectedNote, setSelectedNote] = useState(null);

    const handleCardClick = (note) => {
        setSelectedNote(note);
    };

    const handleClose = () => {
        setSelectedNote(null);
    };

    return (
        <>
            {selectedNote && (
                <div className="fixed inset-0 backdrop-blur-sm z-10" onClick={handleClose}></div>
            )}
            <div className="relative w-full max-w-7xl">
                {/* Background Blur Overlay */}

                <div className={`grid grid-cols-2 gap-4 md:gap-8 ${selectedNote ? 'pointer-events-none' : ''}`}>
                    {/* + New Note Box */}
                    <div
                        className={`animate-scale-in relative h-[170px] w-[170px] p-4 sm:p-6 md:p-8 rounded-xl shadow-lg transition-all duration-500 transform perspective-1000
                        ${darkMode ? 'bg-gradient-to-r from-indigo-900 to-indigo-700' : 'bg-gradient-to-r from-indigo-300 to-indigo-100'}
                        hover:rotate-x-6 hover:-rotate-y-6 hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 cursor-pointer flex flex-col items-center`}
                        onClick={() => { /* Add new note logic */ }}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full ${darkMode ? 'bg-indigo-400' : 'bg-indigo-500'}`}>
                            <BiPlus className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold mt-4">Add Notes</h2>
                        <p className={`text-center ${darkMode ? 'text-slate-400' : ''}`}>Create and update documents</p>
                    </div>

                    {/* Display saved notes */}
                    {defaultNotes.map(note => (
                        <div
                            key={note.id}
                            className={` animate-scale-in w-[170px] h-[170px] relative p-4 sm:p-6 md:p-8 rounded-xl shadow-lg transition-all duration-500 transform perspective-1000
                            ${selectedNote && selectedNote.id === note.id ? 'z-20' : ''}
                            hover:rotate-x-6 hover:-rotate-y-6 hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 cursor-pointer flex flex-col`}
                            style={{
                                backgroundColor: note.color || 'transparent',
                                transformStyle: 'preserve-3d'
                            }}
                            onClick={() => handleCardClick(note)}
                        >
                            <h3 className="text-lg font-semibold mb-1 text-white truncate">{note.title}</h3>
                            <p className="text-sm text-gray-100 flex-grow overflow-hidden overflow-ellipsis whitespace-normal">
                                {note.content.length > 60 ? note.content.substring(0, 60) + "..." : note.content}
                            </p>
                            <div className="mt-1 text-xs text-gray-200">
                                {new Date(note.createdAt).toLocaleDateString()}
                            </div>

                            {/* Floating Icons for Edit and Delete */}
                            {selectedNote && selectedNote.id === note.id && (
                                <>
                                    <div
                                        className={`absolute ${note.id % 2 === 0 ? 'right-[-60px] animate-slide-right' : 'left-[-60px] animate-slide-left'} top-[3.75rem] transform -translate-y-1/2 bg-[#FDE057] text-white p-2 rounded-full cursor-pointer
                                     opacity-0 transition-opacity duration-500`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log('Edit clicked for:', note.title);
                                        }}
                                        style={{
                                            animationDelay: '100',
                                            animationFillMode: 'forwards',
                                        }}
                                    >
                                        <MdEdit className="h-6 w-6" />
                                    </div>
                                    <div
                                        className={`absolute  ${note.id > 2 ? 'top-[-60px] animate-slide-up' : 'bottom-[-60px] animate-slide-down'} right-[4rem] transform -translate-x-1/2 bg-red-500 text-white p-2 rounded-full cursor-pointer
                                     opacity-0 transition-opacity duration-500`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log('Delete clicked for:', note.title);
                                        }}
                                        style={{
                                            animationDelay: '100',
                                            animationFillMode: 'forwards',
                                        }}
                                    >
                                        <BiSolidTrashAlt className="h-6 w-6" />
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* Keyframe Animations */}
                <style jsx>{`
                @keyframes slide-left {
                    from {
                        transform: translateX(30px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slide-down {
                    from {
                        transform: translateY(-30px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                .animate-slide-left {
                    animation: slide-left 100ms ease-out forwards, float 3s ease-in-out infinite;
                }
                
                .animate-slide-down {
                    animation: slide-down 100ms ease-out forwards, float 3s ease-in-out infinite;
                }
                
                @keyframes slide-right {
                    from {
                        transform: translateX(-30px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slide-up {
                    from {
                        transform: translateY(30px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                .animate-slide-right {
                    animation: slide-right 100ms ease-out forwards, float 3s ease-in-out infinite;
                }
                
                .animate-slide-up {
                    animation: slide-up 100ms ease-out forwards, float 3s ease-in-out infinite;
                }
            
                @keyframes float {
                    0% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                    100% {
                        transform: translateY(0);
                    }
                }

                @keyframes scale-in {
                    0% {
                        transform: scale(0.3);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .animate-scale-in {
                    animation: scale-in 500ms ease-out forwards;
                }

            `}</style>
            </div>
        </>
    );
};

export default SavedNotes;