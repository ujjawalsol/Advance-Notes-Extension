import React, { useState } from 'react';
import { FaLink, FaTrash, FaEdit } from 'react-icons/fa';

const LinkStorage = () => {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ title: '', url: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  // Add a new link
  const handleAddLink = () => {
    if (!newLink.title || !newLink.url) {
      return alert('Please fill in all fields');
    }

    setLinks([...links, newLink]);
    setNewLink({ title: '', url: '' });
  };

  // Edit an existing link
  const handleEditLink = (index) => {
    setNewLink(links[index]);
    setIsEditing(true);
    setCurrentIndex(index);
  };

  // Save the edited link
  const handleSaveEdit = () => {
    const updatedLinks = [...links];
    updatedLinks[currentIndex] = newLink;
    setLinks(updatedLinks);
    setIsEditing(false);
    setNewLink({ title: '', url: '' });
  };

  // Delete a link
  const handleDeleteLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Your Links</h2>

        {/* Form to add or edit a link */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              placeholder="Link Title"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newLink.title}
              onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Link URL"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            />
          </div>

          <div className="mt-4 flex justify-center">
            {!isEditing ? (
              <button
                onClick={handleAddLink}
                className="bg-indigo-600 text-white font-semibold rounded-lg px-8 py-2 shadow-lg hover:bg-indigo-700 transition duration-200 ease-in-out"
              >
                Add Link
              </button>
            ) : (
              <button
                onClick={handleSaveEdit}
                className="bg-green-500 text-white font-semibold rounded-lg px-8 py-2 shadow-lg hover:bg-green-600 transition duration-200 ease-in-out"
              >
                Save Edit
              </button>
            )}
          </div>
        </div>

        {/* List of saved links */}
        {links.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {links.map((link, index) => (
              <li
                key={index}
                className="bg-gradient-to-r from-indigo-50 to-indigo-100 border border-gray-200 rounded-lg shadow-lg p-6 flex justify-between items-center space-x-4 hover:shadow-2xl transition-shadow duration-200"
              >
                <div className="flex items-center space-x-4">
                  <FaLink className="text-indigo-600 h-6 w-6" />
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-gray-700 hover:text-indigo-600 transition duration-200"
                  >
                    {link.title}
                  </a>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEditLink(index)}
                    className="text-yellow-500 hover:text-yellow-600 transition"
                  >
                    <FaEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteLink(index)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    <FaTrash className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500 font-semibold mt-10">
            No links added yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkStorage;
