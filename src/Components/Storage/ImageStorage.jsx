import React, { useState, useRef, useEffect } from 'react';
import { saveItem, getItem, compressAndConvertToText } from '../Utils/Services';

const ImageStorage = ({ noteId }) => {
    const colors = [
      'bg-white', 'bg-yellow-200', 'bg-red-200', 'bg-green-200', 'bg-blue-200', 'bg-purple-200', 'bg-pink-200', 'bg-teal-200', 'bg-orange-200', 'bg-gray-200',
      'bg-[#FFE5B4]', 'bg-[#FFB3C6]', 'bg-[#FFDAB9]', 'bg-[#FFFACD]', 'bg-[#F0FFF0]', 'bg-[#E6E6FA]', 'bg-[#B3E5FC]', 'bg-[#C8E6C9]', 'bg-[#FFCCBC]', 'bg-[#FFF9C4]',
      'bg-[#D7CCC8]', 'bg-[#D1C4E9]', 'bg-[#F8BBD0]', 'bg-[#B2EBF2]', 'bg-[#DCEDC8]', 'bg-[#FFE0B2]', 'bg-[#F3E5F5]', 'bg-[#FFECB3]', 'bg-[#BCAAA4]', 'bg-[#CFD8DC]',
      'bg-[#FFCDD2]', 'bg-[#BBDEFB]', 'bg-[#B2DFDB]', 'bg-[#FFF3E0]', 'bg-[#E0F7FA]', 'bg-[#FFEBEE]', 'bg-[#C5CAE9]'
    ];
  
    const getRandomColor = () => colors[Math.floor(Math.random() * colors?.length)];
  
  const [fileName, setFileName] = useState('Untitled');
  const [imageContent, setImageContent] = useState('');
  const [selectedColor, setSelectedColor] = useState(getRandomColor());
  const [currentNoteId, setCurrentNoteId] = useState(noteId || localStorage.getItem('currentNoteId') || `note_${Date.now()}`);
  const debounceTimeout = useRef(null);


  useEffect(() => {
    if (noteId || localStorage?.getItem('currentNoteId')) {
      const noteToLoad = noteId || localStorage.getItem('currentNoteId');
      getItem('ImageStorage', noteToLoad).then(savedNote => {
        if (savedNote) {
          setFileName(savedNote.title);
          setImageContent(savedNote.content);
          setSelectedColor(savedNote.color || getRandomColor());
          setCurrentNoteId(savedNote.id);
        }
      }).catch(error => {
        console.error('Error retrieving note:', error);
      });
    }
  }, [noteId]);

  useEffect(() => {
    const handleAutoSave = () => {
      try {
        // Check if the content is empty or contains only whitespace
        if (!imageContent.trim()) {
          return;
        }

        const data = {
          id: currentNoteId,
          title: fileName,
          content: imageContent,
          color: selectedColor,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        saveItem('ImageStorage', data).then(id => {
          setCurrentNoteId(id);
          localStorage.setItem('currentNoteId', id);
        }).catch(error => {
          console.error('Error saving note:', error);
        });
      } catch (error) {
        console.error('Error saving note:', error);
      }
    };

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(handleAutoSave, 2000); // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(debounceTimeout.current);
  }, [fileName, imageContent, selectedColor, currentNoteId]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const compressedImage = await compressAndConvertToText(file);
      setImageContent(compressedImage);
    }
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-200 to-white shadow-xl rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Image Storage</h1>

      {/* File Name Input */}
      <input
        type="text"
        value={fileName}
        onChange={handleFileNameChange}
        className="mb-2 p-3 border border-gray-400 rounded-lg shadow-md w-full max-w-xs text-gray-700 focus:ring-2 focus:ring-purple-600"
        placeholder="Enter file name"
      />

      {/* Image Upload Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 p-3 border border-gray-400 rounded-lg shadow-md w-full max-w-xs text-gray-700 focus:ring-2 focus:ring-purple-600"
      />

      {/* Display Image */}
      {imageContent && (
        <img src={`data:image/*;base64,${imageContent}`} alt="Uploaded" className="max-w-full h-auto rounded-lg shadow-md" />
      )}
    </div>
  );
};

export default ImageStorage;