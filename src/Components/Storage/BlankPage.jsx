import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { saveItem, getItem } from '../Utils/Services';

const BlankPage = () => {
  const { id, noteId } = useParams();
  const colors = [
    'bg-white', 'bg-yellow-200', 'bg-red-200', 'bg-green-200', 'bg-blue-200', 'bg-purple-200', 'bg-pink-200', 'bg-teal-200', 'bg-orange-200', 'bg-gray-200',
    'bg-[#FFE5B4]', 'bg-[#FFB3C6]', 'bg-[#FFDAB9]', 'bg-[#FFFACD]', 'bg-[#F0FFF0]', 'bg-[#E6E6FA]', 'bg-[#B3E5FC]', 'bg-[#C8E6C9]', 'bg-[#FFCCBC]', 'bg-[#FFF9C4]',
    'bg-[#D7CCC8]', 'bg-[#D1C4E9]', 'bg-[#F8BBD0]', 'bg-[#B2EBF2]', 'bg-[#DCEDC8]', 'bg-[#FFE0B2]', 'bg-[#F3E5F5]', 'bg-[#FFECB3]', 'bg-[#BCAAA4]', 'bg-[#CFD8DC]',
    'bg-[#FFCDD2]', 'bg-[#BBDEFB]', 'bg-[#B2DFDB]', 'bg-[#FFF3E0]', 'bg-[#E0F7FA]', 'bg-[#FFEBEE]', 'bg-[#C5CAE9]'
  ];

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  const [fileName, setFileName] = useState('Untitled');
  const [editorContent, setEditorContent] = useState('');
  const [selectedColor, setSelectedColor] = useState(getRandomColor());
  const [isColorPopupOpen, setIsColorPopupOpen] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(noteId || localStorage.getItem('currentNoteId') || `note_${Date.now()}`);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (noteId || localStorage.getItem('currentNoteId')) {
      const noteToLoad = noteId || localStorage.getItem('currentNoteId');
      getItem(id, noteToLoad).then(savedNote => {
        if (savedNote) {
          setFileName(savedNote.title);
          setEditorContent(savedNote.content);
          setSelectedColor(savedNote.color || getRandomColor());
          setCurrentNoteId(savedNote.id);
        }
      }).catch(error => {
        console.error('Error retrieving note:', error);
      });
    }
  }, [id, noteId]);

  useEffect(() => {
    const handleAutoSave = () => {
      try {
        // Check if the content is empty or contains only whitespace
        if (!editorContent.trim()) {
          return;
        }

        const data = {
          id: currentNoteId,
          title: fileName,
          content: editorContent,
          color: selectedColor,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        saveItem(id, data).then(id => {
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
  }, [fileName, editorContent, selectedColor, currentNoteId, id]);

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

      <style>{`
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