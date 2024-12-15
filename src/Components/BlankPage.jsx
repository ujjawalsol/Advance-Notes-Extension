import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { saveItem, getItem } from './Utils/Services';

const BlankPage = () => {
  const colors = [
    'bg-white',       // White
    'bg-yellow-200',  // Soft Yellow
    'bg-red-200',     // Soft Red
    'bg-green-200',   // Soft Green
    'bg-blue-200',    // Soft Blue
    'bg-purple-200',  // Soft Purple
    'bg-pink-200',    // Soft Pink
    'bg-teal-200',    // Soft Teal
    'bg-orange-200',  // Soft Orange
    'bg-gray-200',    // Light Gray
    'bg-[#FFE5B4]', // Soft Peach
    'bg-[#FFB3C6]', // Pastel Pink
    'bg-[#FFDAB9]', // Light Apricot
    'bg-[#FFFACD]', // Lemon Chiffon
    'bg-[#F0FFF0]', // Honeydew
    'bg-[#E6E6FA]', // Lavender
    'bg-[#B3E5FC]', // Light Blue
    'bg-[#C8E6C9]', // Pale Green
    'bg-[#FFCCBC]', // Melon
    'bg-[#FFF9C4]', // Soft Yellow
    'bg-[#D7CCC8]', // Warm Taupe
    'bg-[#D1C4E9]', // Soft Purple
    'bg-[#F8BBD0]', // Blush Pink
    'bg-[#B2EBF2]', // Aqua Blue
    'bg-[#DCEDC8]', // Pastel Green
    'bg-[#FFE0B2]', // Light Orange
    'bg-[#F3E5F5]', // Soft Lilac
    'bg-[#FFECB3]', // Buttercream
    'bg-[#BCAAA4]', // Subtle Beige
    'bg-[#CFD8DC]', // Misty Gray
    'bg-[#FFCDD2]', // Rose Pink
    'bg-[#BBDEFB]', // Sky Blue
    'bg-[#B2DFDB]', // Teal Mint
    'bg-[#FFF3E0]', // Creamy Orange
    'bg-[#E0F7FA]', // Soft Cyan
    'bg-[#FFEBEE]', // Petal Pink
    'bg-[#C5CAE9]', // Periwinkle
  ];

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  const [fileName, setFileName] = useState('Untitled');
  const [editorContent, setEditorContent] = useState('');
  const [noteId, setNoteId] = useState(null);
  const [selectedColor, setSelectedColor] = useState(getRandomColor());
  const [isColorPopupOpen, setIsColorPopupOpen] = useState(false);

  useEffect(() => {
    const savedNoteId = localStorage.getItem('currentNoteId');
    if (savedNoteId) {
      const savedNote = getItem(savedNoteId);
      if (savedNote) {
        setFileName(savedNote.title);
        setEditorContent(savedNote.content);
        setNoteId(savedNoteId);
        setSelectedColor(savedNote.color || getRandomColor());
      }
    }
  }, []);

  useEffect(() => {
    const handleAutoSave = () => {
      try {
        const data = {
          id: noteId,
          title: fileName,
          content: editorContent,
          color: selectedColor,
          type: 'text',
        };
        const id = saveItem(data);
        setNoteId(id);
        localStorage.setItem('currentNoteId', id);
      } catch (error) {
        console.error('Error saving note:', error);
      }
    };

    const debounceSave = setTimeout(handleAutoSave, 2000); // Auto-save after 2 seconds of inactivity
    return () => clearTimeout(debounceSave);
  }, [fileName, editorContent, selectedColor, noteId]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }], // Headers
      ['bold', 'italic', 'underline', 'strike'], // Basic formatting
      [{ list: 'ordered' }, { list: 'bullet' }], // Lists
      ['code-block'], // Code blocks
      ['link', 'image'], // Links and images
      ['clean'], // Remove formatting
    ],
  };

  const togglePopup = () => setIsColorPopupOpen(!isColorPopupOpen);

  const selectColor = (color) => {
    setSelectedColor(color);
    setIsColorPopupOpen(false); // Close popup after selection
  };

  return (
    <>
      <div className={`w-full max-w-3xl ${selectedColor} dark:border-gray-700 border-gray-300 border rounded-lg shadow-lg p-2`}>
        <div
          className={`flex justify-evenly rounded-t-3xl border-b-[1px] border-x-[1px] border-t-[1px]  p-4 gap-4 bg-white text-gray-900 border-[#333] focus-within:border-purple-500`}
        >
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className={`w-full text-lg bg-white text-gray-900 border-gray-400 focus:outline-none`}
            placeholder="Enter a file name"
          />

          <div className="relative">
            <div className={`h-7 w-7 items-center justify-center flex rounded-full dark:border-gray-600 border-black border-[2px]`} onClick={togglePopup}>
              <div className={`h-[1.35rem] w-[1.35rem] rounded-full ${selectedColor}`}></div>
            </div>

            {isColorPopupOpen && (
              <div className={`absolute top-10 left-[-110px] w-36 p-2 rounded-lg shadow-lg dark:bg-gray-700 bg-white border dark:border-gray-600 border-gray-300 flex flex-wrap gap-2`}>
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className={`h-6 w-6 rounded-full cursor-pointer border-2 ${color === selectedColor ? 'border-black' : 'border-transparent'} ${color}`}
                    onClick={() => selectColor(color)}
                  ></div>
                ))}
              </div>
            )}
          </div>
        </div>

        <ReactQuill
          theme="snow"
          value={editorContent}
          onChange={setEditorContent}
          modules={modules}
          className={`mb-4 min-h-[300px] ${selectedColor} dark:quill-dark quill-light`}
        />
      </div>

      <Toaster position="top-center" reverseOrder={false} />

      <style jsx>{`
              quill-light .ql-container {
                background-color: #ffffff;
                color: #000000;
              }

              .quill-dark .ql-container {
                background-color:  ${selectedColor};
                color: #ffffff;
              }

              /* Custom styles for the Quill toolbar */
              .quill-light .ql-toolbar {
                background-color: white;
                border: 1px solid #333;
                border-top: none;
                border-radius: 0 0 24px 24px ;
                margin-bottom: 8px;
              }

              .quill-dark .ql-toolbar {
                border: 1px solid #333;
                border-radius: 0 0 24px 24px ;
                border-top: none;
                margin-bottom: 8px;
                color: #ffffff;
                background: white;
              }

              /* Custom styles for Quill editor content */
              .quill-light .ql-editor {
                height: 320px;
                background-color:  ${selectedColor};
                color: #000000;
              }

              .quill-dark .ql-editor {
                min-height: 320px;
                background-color:  ${selectedColor};
                color: #000000;
              }

              .ql-container.ql-snow{
                  border: none;
                  position: inherit;
              }

              .ql-formats{
                  color: #ffffff;
              }
            `}</style>
    </>
  );
};

export default BlankPage;