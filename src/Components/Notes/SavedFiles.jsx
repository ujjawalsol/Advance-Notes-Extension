// src/components/SavedFiles.jsx
import React, { useEffect, useState } from 'react';

const SavedFiles = () => {
    const [files, setFiles] = useState([]);

    // Load all items from localStorage
    useEffect(() => {
        const items = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            items.push({ key, value });
        }
        setFiles(items);
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Saved Files and Notes</h2>
            {files.length === 0 ? (
                <p>No saved files available.</p>
            ) : (
                <ul className="space-y-3">
                    {files.map((file, index) => (
                        <li key={index} className="p-3 border rounded shadow">
                            <h3 className="font-semibold">Key: {file.key}</h3>
                            <p>Value: {file.value}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SavedFiles;
