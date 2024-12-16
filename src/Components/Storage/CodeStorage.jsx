import React, { useEffect, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/clike/clike';
import '../../assets/styles/CodeStorage.css'; // Import the custom CSS file

const CodeStorage = () => {
  const [code, setCode] = useState('');
  const [fileName, setFileName] = useState('untitled'); // State for file name
  const [mode, setMode] = useState('javascript'); // Default mode

  useEffect(() => {
    const savedCode = localStorage.getItem('savedCode');
    const savedFileName = localStorage.getItem('fileName') || 'untitled'; // Get saved file name or default to 'untitled'

    if (savedCode) {
      setCode(savedCode);
    }
    setFileName(savedFileName);
  }, []);

  const handleCodeChange = (editor, data, value) => {
    setCode(value);
    detectMode(value); // Detect mode based on the code
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleSaveCode = () => {
    localStorage.setItem('savedCode', code);
    localStorage.setItem('fileName', fileName);
    alert(`Code saved as "${fileName}" successfully!`);
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

      <button
        onClick={handleSaveCode}
        className="mt-4 bg-purple-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-200"
      >
        Save Code
      </button>
    </div>
  );
};

export default CodeStorage;
