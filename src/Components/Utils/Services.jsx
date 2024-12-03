// services.js

// Function to generate a unique ID for each note
const generateId = () => `note_${Date.now()}`;

// Save a note or file with full details (id, title, content, type, timestamps)
export const saveItem = (data) => {
    try {
        const id = data.id || generateId(); // Generate a new ID if none is provided
        const item = {
            id,
            title: data.title,
            content: data.content,
            type: data.type,         // e.g., 'text', 'image', 'code', 'video', etc.
            createdAt: data.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem(id, JSON.stringify(item));
        return id;
    } catch (error) {
        console.error('Error saving item to localStorage:', error);
    }
};

// Retrieve a note/file by ID
export const getItem = (id) => {
    try {
        const data = localStorage.getItem(id);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error retrieving item from localStorage:', error);
        return null;
    }
};

// Update an existing note or file by ID (merging new data)
export const updateItem = (id, newData) => {
    try {
        const existingItem = getItem(id);
        if (!existingItem) return null;

        const updatedItem = {
            ...existingItem,
            ...newData,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem(id, JSON.stringify(updatedItem));
        return updatedItem;
    } catch (error) {
        console.error('Error updating item in localStorage:', error);
        return null;
    }
};

// Retrieve all items from localStorage, optionally filtered by type
export const getAllItems = (type = null) => {
    try {
        const items = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const data = JSON.parse(localStorage.getItem(key));
            if (data && (!type || data.type === type)) {
                items.push(data);
            }
        }
        return items;
    } catch (error) {
        console.error('Error retrieving all items from localStorage:', error);
        return [];
    }
};

// Delete a note/file by ID
export const deleteItem = (id) => {
    try {
        localStorage.removeItem(id);
    } catch (error) {
        console.error('Error deleting item from localStorage:', error);
    }
};

// Clear all data in localStorage
export const clearStorage = () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
};
