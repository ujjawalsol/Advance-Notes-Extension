import React, { useEffect, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { Toaster, toast } from 'react-hot-toast';

const BlankPage = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);
  const [fileName, setFileName] = useState('untitled'); // State for file name

  const config = {
    height: 400,
    width: '100%',
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'font', 'fontsize', 'brush', '|',
      'paragraph', 'ul', 'ol', '|',
      'outdent', 'indent', '|',
      'align', 'insertTable', '|',
      'undo', 'redo', '|',
      'clean', 'html', '|',
      'print', 'source'
    ],
    removeButtons: ['fullsize'],
    uploader: {
      insertImageAsBase64URI: true,
      url: '/upload',
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

  useEffect(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  const handleContentChange = (newContent) => {
    setContent(newContent);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      localStorage.setItem('editorContent', newContent);
    }, 1000);

    setTimeoutId(newTimeoutId);
  };

  const handleSave = () => {
    localStorage.setItem('editorContent', content);
    toast.success('Note saved successfully!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-white to-indigo-50 shadow-2xl rounded-lg">
      <h1 className="text-2xl font-poppins font-bold mb-6 text-gray-900">Blank Page</h1>
      <div className="w-full max-w-7xl border bg-gradient-to-r from-indigo-100 to-indigo-50 border-gray-300 rounded-lg overflow-hidden shadow-lg p-6">
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        className="mb-6 w-full max-w-md p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
        placeholder="Enter file name"
      />
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={handleContentChange}
        />
      </div>
      <button
        onClick={handleSave}
        className="mt-6 bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-indigo-700 transition duration-300"
      >
        Save
      </button>
      <Toaster reverseOrder={false} />
    </div>
  );
  
};

export default BlankPage;