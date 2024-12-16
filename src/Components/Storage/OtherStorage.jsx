import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt, FaTrash } from 'react-icons/fa';
import { Document, Page } from 'react-pdf'; // PDF Preview
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import mammoth from 'mammoth'; // DOCX Preview

const OtherFileStorage = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef(null);
  const [docPreviews, setDocPreviews] = useState({});

  // Handle file selection
  const handleFiles = (selectedFiles) => {
    const validFiles = selectedFiles.filter((file) => !file.type.includes('image'));
    if (validFiles.length > 0) {
      setFiles([...files, ...validFiles]);
      generatePreviews(validFiles);
      setError('');
    } else {
      setError('Please upload valid files (not images).');
    }
  };

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleDelete = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    const updatedPreviews = { ...docPreviews };
    delete updatedPreviews[index];
    setDocPreviews(updatedPreviews);
  };

  const handleSave = () => {
    if (files.length > 0) {
      setIsSaved(true);
      alert('Files saved successfully!');
    }
  };

  // Generate previews for supported file types
  const generatePreviews = (fileList) => {
    fileList.forEach((file, index) => {
      const fileType = file.type;

      // PDF Preview
      if (fileType === 'application/pdf') {
        setDocPreviews((prev) => ({
          ...prev,
          [index]: <Document file={file}><Page pageNumber={1} /></Document>,
        }));

      // DOCX Preview
      } else if (file.name.endsWith('.docx')) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const arrayBuffer = event.target.result;
          const result = await mammoth.extractRawText({ arrayBuffer });
          setDocPreviews((prev) => ({
            ...prev,
            [index]: <div className="overflow-auto max-h-40 p-2">{result.value}</div>,
          }));
        };
        reader.readAsArrayBuffer(file);

      // Text-based files (HTML, XML, Python, JSON, etc.)
      } else if (fileType.startsWith('text/') || 
                 file.name.endsWith('.html') || 
                 file.name.endsWith('.xml') || 
                 file.name.endsWith('.py') || 
                 file.name.endsWith('.json')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setDocPreviews((prev) => ({
            ...prev,
            [index]: <pre className="overflow-auto max-h-40 p-2 bg-gray-100 rounded">{event.target.result}</pre>,
          }));
        };
        reader.readAsText(file);

      // Unsupported File
      } else {
        setDocPreviews((prev) => ({
          ...prev,
          [index]: <p className="text-gray-800">Preview not available</p>,
        }));
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 rounded-3xl shadow-2xl bg-white">
      <h1 className="text-2xl font-bold mb-8 text-gray-900">File Storage</h1>

      {/* Drag and Drop Area */}
      {files.length === 0 && (
        <div
          className="w-full max-w-2xl border-dashed border-4 border-yellow-400 rounded-xl flex flex-col items-center justify-center p-16 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const droppedFiles = Array.from(e.dataTransfer.files);
            handleFiles(droppedFiles);
          }}
        >
          <FaCloudUploadAlt className="text-yellow-400 text-8xl mb-6" />
          <p className="text-lg text-gray-800 font-semibold mb-4">
            Drag & drop your files here, or
          </p>
          <button
            className="bg-yellow-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300"
            onClick={() => fileInputRef.current.click()}
          >
            Select Files
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt,.html,.xml,.py,.json,.ppt,.pptx"
            multiple
            onChange={handleFileUpload}
          />
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* File Preview Section */}
      {files.length > 0 && (
        <div className="w-full max-w-4xl mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {files.map((file, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-b from-yellow-200 to-white rounded-3xl shadow-xl p-4 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex flex-col space-y-4">
                  <p className="text-lg text-gray-800 truncate">{file.name}</p>
                  <div className="preview-container">{docPreviews[index]}</div>
                </div>
                <button
                  className="absolute top-3 right-3 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300"
                  onClick={() => handleDelete(index)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* Save Button */}
          {!isSaved && (
            <button
              className="w-full bg-gradient-to-r from-yellow-600 to-yellow-400 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:from-yellow-700 hover:to-yellow-500 transition-all duration-300"
              onClick={handleSave}
            >
              Save Files
            </button>
          )}
        </div>
      )}

      {files.length === 0 && (
        <p className="text-gray-600 mt-6">No files uploaded yet. Add your files to view them here.</p>
      )}
    </div>
  );
};

export default OtherFileStorage;
