import React, { useEffect, useRef, useState } from 'react';
import JoditEditor from 'jodit-react'; // Import the JoditEditor without braces

const BlankPage = () => {
  const editor = useRef(null); // Create a ref for the editor
  const [content, setContent] = useState(''); // State to hold the editor content
  const [timeoutId, setTimeoutId] = useState(null); // State to hold timeout ID

  // Configuration for the Jodit editor
  const config = {
    height: 600, // Set a height for the editor
    width: '100%', // Full width of the container
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'font', 'fontsize', 'brush', '|',
      'paragraph', 'ul', 'ol', '|',
      'outdent', 'indent', '|',
      'align', 'insertTable', '|',
      'undo', 'redo', '|',
      'clean', 'html', '|',
      'print', 'source' // Removed 'fullsize' button
    ],
    removeButtons: ['fullsize'], // Ensure 'fullsize' button is removed
    uploader: {
      insertImageAsBase64URI: true, // Insert images as base64 URIs
      url: '/upload', // Your upload URL here
      format: 'json',
      method: 'POST',
      headers: {
        'X-CSRF-TOKEN': 'CSRF-Token',
        Authorization: 'Bearer <token>'
      },
      filesVariableName: function (i) {
        return 'files[' + i + ']';
      },
      withCredentials: false,
      pathVariableName: 'path',
      prepareData: function (data) {
        return data;
      },
      isSuccess: function (resp) {
        return !resp.error;
      },
      getMsg: function (resp) {
        return resp.msg.join !== undefined ? resp.msg.join(' ') : resp.msg;
      },
      process: function (resp) {
        return {
          files: resp.files || [],
          path: resp.path,
          baseurl: resp.baseurl,
          error: resp.error,
          msg: resp.msg
        };
      }
    }
  };

  // Load content from local storage on component mount
  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  // Save content to local storage whenever it changes
  const handleContentChange = (newContent) => {
    setContent(newContent);

    // Clear the previous timeout if it exists
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout to save the content after 1 second
    const newTimeoutId = setTimeout(() => {
      localStorage.setItem('editorContent', newContent); // Save to local storage
    }, 0.1); // Save after 1 second of inactivity

    setTimeoutId(newTimeoutId); // Update timeoutId state
  };

  // Function to handle save button click
  const handleSave = () => {
    localStorage.setItem('editorContent', content); // Save content to local storage
    alert('Content saved successfully!'); // Alert message for user
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-sky-200 to-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Blank Page</h1>
      <div className="w-full max-w-7xl border border-gray-300 rounded-lg overflow-hidden shadow-lg p-4"> {/* Responsive container */}
        <JoditEditor
          ref={editor}
          value={content}
          config={config} // Include the config
          tabIndex={1} // tabIndex for focus management
          onBlur={handleContentChange} // Update content state
        />
      </div>
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
};

export default BlankPage;
