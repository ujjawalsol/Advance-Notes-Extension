import React, { useState } from 'react';
import FileManager from './Components/FileManager';
import CodeStorage from './Components/CodeStorage';
import BlankPage from './Components/BlankPage';

function App() {
  const [activeBox, setActiveBox] = useState(null);

  const handleBoxClick = (box) => {
    setActiveBox(box);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center p-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-slate-900 mb-10 tracking-wide">Advanced Notes</h1>

      {/* Note boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {/* Blank Page */}
        <div
          className="bg-gradient-to-r from-indigo-100 to-indigo-50 p-8 rounded-xl border border-indigo-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center"
          onClick={() => handleBoxClick('blank')}
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mt-4">Blank Page</h2>
          <p className="text-gray-600 text-center">Create and edit documents with full formatting.</p>
        </div>

        {/* Video Storage */}
        <div
          className="bg-gradient-to-r from-red-100 to-red-50 p-8 rounded-xl border border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center"
          onClick={() => handleBoxClick('video')}
        >
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-red-600">
            {/* New Video Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-white" // Increase the icon size
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7" // Thinner stroke for the new icon
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8v8l7-4-7-4" // Updated path for a more defined video icon
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mt-4">Video Storage</h2>
          <p className="text-gray-600 text-center">Store and manage your video files.</p>
        </div>



        {/* Image Storage */}
        <div
          className="bg-gradient-to-r from-green-100 to-green-50 p-8 rounded-xl border border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center"
          onClick={() => handleBoxClick('image')}
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4-4 4 4 4-4 4 4V4H4v12z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mt-4">Image Storage</h2>
          <p className="text-gray-600 text-center">Store and organize your images.</p>
        </div>

        {/* Code Storage */}
        <div
          className="bg-gradient-to-r from-purple-100 to-purple-50 p-8 rounded-xl border border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center"
          onClick={() => handleBoxClick('code')}
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 18l4-4-4-4m-8 8l-4-4 4-4" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mt-4">Code Space</h2>
          <p className="text-gray-600 text-center">Store your code with syntax highlighting.</p>
        </div>

        {/* Other Files */}
        <div
          className="bg-gradient-to-r from-yellow-100 to-yellow-50 p-8 rounded-xl border border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center"
          onClick={() => handleBoxClick('other')}
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mt-4">Other Files</h2>
          <p className="text-gray-600 text-center">Manage other types of files here.</p>
        </div>


      </div>

      {/* Render content for clicked box */}
      <div className="mt-12 w-full max-w-6xl">
        {activeBox && (
          <div className="bg-white p-8 rounded-xl shadow-lg">
            {activeBox === 'blank' && <BlankPage />}
            {activeBox === 'video' && <FileManager type="Video" />}
            {activeBox === 'image' && <FileManager type="Image" />}
            {activeBox === 'other' && <FileManager type="Other" />}
            {activeBox === 'code' && <CodeStorage />}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
