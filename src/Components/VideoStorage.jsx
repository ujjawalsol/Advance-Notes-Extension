import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt, FaTrash } from 'react-icons/fa';
import '../../public/VideoStorage.css'; // Optional custom styles

const VideoStorage = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const videoFiles = files.filter((file) => file.type.includes('video'));
    if (videoFiles.length > 0) {
      setVideos([...videos, ...videoFiles]);
      setError('');
    } else {
      setError('Please upload valid video files.');
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleDelete = (index) => {
    const updatedVideos = videos.filter((_, i) => i !== index);
    setVideos(updatedVideos);
  };

  const handleSave = () => {
    if (videos.length > 0) {
      setIsSaved(true);
      alert('Videos saved successfully!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-white p-6 rounded-3xl shadow-2xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Video Storage</h1>

      {/* Drag and Drop Area */}
      {videos.length === 0 && (
        <div
          className="w-full max-w-2xl border-dashed border-4 border-red-400 rounded-xl flex flex-col items-center justify-center p-16 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <FaCloudUploadAlt className="text-red-400 text-8xl mb-6" />
          <p className="text-lg text-gray-800 font-semibold mb-4">
            Drag & drop your video files here, or
          </p>
          <button
            className="bg-red-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-red-600 transition-all duration-300"
            onClick={() => fileInputRef.current.click()}
          >
            Select Video Files
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="video/*"
            multiple
            onChange={handleFileUpload}
          />
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Video Preview Section */}
      {videos.length > 0 && (
        <div className="w-full max-w-4xl mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {videos.map((video, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-b from-red-200 to-white rounded-3xl shadow-xl p-4 hover:shadow-2xl transition-shadow duration-300"
              >
                <video controls className="w-full rounded-lg">
                  <source src={URL.createObjectURL(video)} type={video.type} />
                  Your browser does not support the video tag.
                </video>
                <button
                  className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition duration-300"
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
              className="w-full bg-gradient-to-r from-red-600 to-red-400 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:from-red-700 hover:to-red-500 transition-all duration-300"
              onClick={handleSave}
            >
              Save Videos
            </button>
          )}
        </div>
      )}

      {videos.length === 0 && (
        <p className="text-gray-600 mt-6">No videos uploaded yet. Add your videos to view them here.</p>
      )}
    </div>
  );
};

export default VideoStorage;
