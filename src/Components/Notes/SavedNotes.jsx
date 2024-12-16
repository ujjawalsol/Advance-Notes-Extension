import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BiPlus, BiSolidTrashAlt } from 'react-icons/bi';
import { MdEdit } from "react-icons/md";
import { getAllItems, deleteItem } from '../Utils/Services';

const SavedNotes = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        getAllItems(id).then(fetchedNotes => {
            setNotes(fetchedNotes);
        }).catch(error => {
            console.error('Error fetching notes:', error);
        });
    }, [id]);

    const handleCardClick = (note) => {
        setSelectedNote(note);
    };

    const handleEditClick = (note) => {
        navigate(`/edit-note/${id}/${note.id}`);
    };

    const handleDeleteClick = async (note) => {
        try {
            await deleteItem(id, note.id);
            setNotes(notes.filter(n => n.id !== note.id));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const handleClose = () => {
        setSelectedNote(null);
    };

    const handleAddNoteClick = () => {
        const newNoteId = `note_${Date.now()}`;
        localStorage.setItem('currentNoteId', newNoteId);
        navigate(`/edit-note/${id}/${newNoteId}`);
    };

    return (
        <>
            {selectedNote && (
                <div className="fixed inset-0 backdrop-blur-sm z-10" onClick={handleClose}></div>
            )}
            <div className="relative w-full max-w-7xl">
                <div className={`grid grid-cols-2 gap-4 md:gap-8`}>
                    {/* + New Note Box */}
                    <div
                        className={`animate-scale-in relative h-[170px] w-[170px] p-4 sm:p-6 md:p-8 rounded-xl shadow-lg transition-all duration-500 transform perspective-1000
                        bg-gradient-to-r from-indigo-300 to-indigo-100 dark:from-indigo-900 dark:to-indigo-700
                        hover:rotate-x-6 hover:-rotate-y-6 hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 cursor-pointer flex flex-col items-center`}
                        onClick={handleAddNoteClick}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-indigo-500 dark:bg-indigo-400">
                            <BiPlus className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold mt-4">Add Notes</h2>
                        <p className="text-center text-slate-800 dark:text-slate-400">Create and update documents</p>
                    </div>

                    {/* Display saved notes */}
                    {notes.map((note, index) => (
                        <div
                            key={note.id}
                            className={`animate-scale-in w-[170px] h-[170px] relative p-4 sm:p-6 md:p-8 rounded-xl shadow-lg transition-all duration-500 transform perspective-1000
                            ${selectedNote && selectedNote.id === note.id ? 'z-20' : ''}
                            hover:rotate-x-6 hover:-rotate-y-6 hover:scale-105 hover:shadow-2xl hover:bg-opacity-90 cursor-pointer flex flex-col ${note.color}`}
                            style={{
                                transformStyle: 'preserve-3d'
                            }}
                            onClick={() => handleCardClick(note)}
                        >
                            <h3 className="text-lg font-semibold mb-1 text-black truncate">{note.title}</h3>
                            <p className="text-sm text-gray-900 flex-grow overflow-hidden overflow-ellipsis whitespace-normal">
                                {note.content.length > 60 ? note.content.substring(0, 60) + "..." : note.content}
                            </p>
                            <div className="mt-1 text-xs text-gray-500">
                                {new Date(note.createdAt).toLocaleDateString()}
                            </div>

                            {/* Floating Icons for Edit and Delete */}
                            {selectedNote && selectedNote.id === note.id && (
                                <>
                                    <div
                                        className={`absolute ${(index + 1) % 2 === 0 ? 'right-[-60px] animate-slide-right' : 'left-[-60px] animate-slide-left'} top-[3.75rem] transform -translate-y-1/2 bg-[#FDE057] text-white p-2 rounded-full cursor-pointer
                                     opacity-100 transition-opacity duration-500`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEditClick(note);
                                        }}
                                    >
                                        <MdEdit className="h-6 w-6" />
                                    </div>
                                    <div
                                        className={`absolute  ${index > 1 ? 'top-[-60px] animate-slide-up' : 'bottom-[-60px] animate-slide-down'} right-[4rem] transform -translate-x-1/2 bg-red-500 text-white p-2 rounded-full cursor-pointer
                                     opacity-100 transition-opacity duration-500`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteClick(note);
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
                <style>{`
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