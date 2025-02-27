const dbName = "NoteItDB";
const dbVersion = 1;

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.errorCode);
    };
  });
};

const generateId = () => `note_${Date.now()}`;

export const compressAndConvertToText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target.result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

export const saveItem = async (storeName, data) => {
  try {
    const db = await openDB();
    if (!db.objectStoreNames.contains(storeName)) {
      throw new Error(`Object store "${storeName}" not found`);
    }
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    const id = data.id || generateId();
    const item = {
      ...data,
      id,
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.put(item);
    return id;
  } catch (error) {
    console.error('Error saving item to IndexedDB:', error);
  }
};

export const getItem = async (storeName, id) => {
  try {
    const db = await openDB();
    if (!db.objectStoreNames.contains(storeName)) {
      throw new Error(`Object store "${storeName}" not found`);
    }
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);

    return new Promise((resolve, reject) => {
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        reject(event.target.errorCode);
      };
    });
  } catch (error) {
    console.error('Error retrieving item from IndexedDB:', error);
  }
};

export const updateItem = async (storeName, id, newData) => {
  try {
    const existingItem = await getItem(storeName, id);
    if (!existingItem) return null;

    const updatedItem = {
      ...existingItem,
      ...newData,
      updatedAt: new Date().toISOString()
    };

    await saveItem(storeName, updatedItem);
    return updatedItem;
  } catch (error) {
    console.error('Error updating item in IndexedDB:', error);
  }
};

export const getAllItems = async (storeName) => {
  try {
    const db = await openDB();
    if (!db.objectStoreNames.contains(storeName)) {
      throw new Error(`Object store "${storeName}" not found`);
    }
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);

    return new Promise((resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event) => {
        reject(event.target.errorCode);
      };
    });
  } catch (error) {
    console.error('Error retrieving all items from IndexedDB:', error);
  }
};

export const deleteItem = async (storeName, id) => {
  try {
    const db = await openDB();
    if (!db.objectStoreNames.contains(storeName)) {
      throw new Error(`Object store "${storeName}" not found`);
    }
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    store.delete(id);
  } catch (error) {
    console.error('Error deleting item from IndexedDB:', error);
  }
};

export const clearStorage = async (storeName) => {
  try {
    const db = await openDB();
    if (!db.objectStoreNames.contains(storeName)) {
      throw new Error(`Object store "${storeName}" not found`);
    }
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    store.clear();
  } catch (error) {
    console.error('Error clearing IndexedDB store:', error);
  }
};