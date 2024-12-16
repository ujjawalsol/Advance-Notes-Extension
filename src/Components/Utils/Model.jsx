import { useEffect } from "react";

const dbName = "NoteItDB";
const dbVersion = 1;

const useInitializeIndexedDB = () => {
  useEffect(() => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create object stores for each type of storage
      db.createObjectStore("BlankPage", { keyPath: "id" });
      db.createObjectStore("VideoStorage", { keyPath: "id" });
      db.createObjectStore("ImageStorage", { keyPath: "id" });
      db.createObjectStore("CodeSpace", { keyPath: "id" });
      db.createObjectStore("OtherFiles", { keyPath: "id" });
      db.createObjectStore("LinkStorage", { keyPath: "id" });

      console.log("IndexedDB initialized with object stores.");
    };

    request.onsuccess = () => {
      console.log("IndexedDB opened successfully.");
    };

    request.onerror = (event) => {
      console.error("Error opening IndexedDB:", event.target.errorCode);
    };
  }, []);
};

export default useInitializeIndexedDB;