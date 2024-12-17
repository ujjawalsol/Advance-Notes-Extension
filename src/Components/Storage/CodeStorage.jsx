import React, { useEffect, useState, useRef } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { useParams } from 'react-router-dom';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/clike/clike';
import '../../assets/styles/CodeStorage.css'; // Import the custom CSS file
import { saveItem, getItem } from '../Utils/Services'; // Import saveItem and getItem functions

const CodeStorage = () => {
  const { id, noteId } = useParams();
  const colors = [
    'bg-white', 'bg-yellow-200', 'bg-red-200', 'bg-green-200', 'bg-blue-200', 'bg-purple-200', 'bg-pink-200', 'bg-teal-200', 'bg-orange-200', 'bg-gray-200',
    'bg-[#FFE5B4]', 'bg-[#FFB3C6]', 'bg-[#FFDAB9]', 'bg-[#FFFACD]', 'bg-[#F0FFF0]', 'bg-[#E6E6FA]', 'bg-[#B3E5FC]', 'bg-[#C8E6C9]', 'bg-[#FFCCBC]', 'bg-[#FFF9C4]',
    'bg-[#D7CCC8]', 'bg-[#D1C4E9]', 'bg-[#F8BBD0]', 'bg-[#B2EBF2]', 'bg-[#DCEDC8]', 'bg-[#FFE0B2]', 'bg-[#F3E5F5]', 'bg-[#FFECB3]', 'bg-[#BCAAA4]', 'bg-[#CFD8DC]',
    'bg-[#FFCDD2]', 'bg-[#BBDEFB]', 'bg-[#B2DFDB]', 'bg-[#FFF3E0]', 'bg-[#E0F7FA]', 'bg-[#FFEBEE]', 'bg-[#C5CAE9]'
  ];

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  const [code, setCode] = useState('');
  const [fileName, setFileName] = useState('untitled'); // State for file name
  const [mode, setMode] = useState('javascript'); // Default mode
  const [selectedColor, setSelectedColor] = useState(getRandomColor()); // State for selected color
  const [currentNoteId, setCurrentNoteId] = useState(noteId || localStorage.getItem('currentNoteId') || `note_${Date.now()}`); // State for current note ID
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (noteId || localStorage.getItem('currentNoteId')) {
      const noteToLoad = noteId || localStorage.getItem('currentNoteId');
      getItem('CodeSpace', noteToLoad).then(savedNote => {
        if (savedNote) {
          setFileName(savedNote.title);
          setCode(savedNote.content);
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
        if (!code.trim()) {
          return;
        }

        const data = {
          id: currentNoteId,
          title: fileName,
          content: code,
          color: selectedColor,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        saveItem('CodeSpace', data).then(id => {
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
  }, [fileName, code, selectedColor, currentNoteId]);

  const handleCodeChange = (editor, data, value) => {
    setCode(value);
    detectMode(value); // Detect mode based on the code
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  // Detect language mode based on the code
  const detectMode = (code) => {
    if (code.match(/<\?php/i)) {
      setMode('application/x-httpd-php');
    } else if (code.match(/import |def |print\(/i)) {
      setMode('python');
    } else if (code.match(/<html>|<\/html>/i)) {
      setMode('htmlmixed');
    } else if (code.match(/class\s+\w+/i)) {
      setMode('clike');
    } else if (code.match(/function\s+\w+/i)) {
      setMode('javascript');
    } else {
      setMode('javascript');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-200 to-white shadow-xl rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Code Storage</h1>

      {/* File Name Input */}
      <input
        type="text"
        value={fileName}
        onChange={handleFileNameChange}
        className="mb-2 p-3 border border-gray-400 rounded-lg shadow-md w-full max-w-xs text-gray-700 focus:ring-2 focus:ring-purple-600"
        placeholder="Enter file name"
      />

      <div className="w-full max-w-4xl">
        <CodeMirror
          value={code}
          options={{
            mode: mode,
            theme: 'material',
            lineNumbers: true,
            tabSize: 2,
            indentWithTabs: true,
            viewportMargin: Infinity,
            lineWrapping: true,
          }}
          onBeforeChange={handleCodeChange}
          className="border border-gray-300 rounded-lg custom-codemirror"
        />
      </div>
    </div>
  );
};

export default CodeStorage;