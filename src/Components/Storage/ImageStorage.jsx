import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt, FaTrash } from 'react-icons/fa';

const ImageStorage = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = useRef(null);

  // Handle drag and drop for images
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  // Handle selected image files
  const handleFiles = (files) => {
    const imageFiles = files.filter((file) => file.type.includes('image'));
    if (imageFiles.length > 0) {
      setImages([...images, ...imageFiles]);
      setError(''); // Clear previous error
    } else {
      setError('Please upload valid image files.');
    }
  };

  // Handle manual file selection
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  // Handle image delete
  const handleDelete = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // Handle saving images
  const handleSave = () => {
    if (images.length > 0) {
      setIsSaved(true);
      alert('Images saved successfully!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 rounded-3xl shadow-2xl">
      <h1 className="text-2xl font-bold mb-8 text-gray-900">Image Storage</h1>

      {/* Drag and Drop Area */}
      {images.length === 0 && (
        <div
          className="w-full max-w-2xl border-dashed border-4 border-green-400 rounded-xl flex flex-col items-center justify-center p-16 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <FaCloudUploadAlt className="text-green-400 text-8xl mb-6" />
          <p className="text-lg text-gray-800 font-semibold mb-4">
            Drag & drop your image files here, or
          </p>
          <button
            className="bg-green-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
            onClick={() => fileInputRef.current.click()}
          >
            Select Image Files
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
          />
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Image Preview Section */}
      {images.length > 0 && (
        <div className="w-full max-w-4xl mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative  bg-gradient-to-b from-green-200 to-white rounded-3xl shadow-xl p-4 hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  className="absolute top-3 right-3 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition duration-300"
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
              className="w-full bg-gradient-to-r from-green-600 to-green-400 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:from-green-700 hover:to-green-500 transition-all duration-300"
              onClick={handleSave}
            >
              Save Images
            </button>
          )}
        </div>
      )}

      {images.length === 0 && (
        <p className="text-gray-600 mt-6">No images uploaded yet. Add your images to view them here.</p>
      )}
    </div>
  );
};

export default ImageStorage;
