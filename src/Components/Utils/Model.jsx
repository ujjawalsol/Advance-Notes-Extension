import { useEffect } from "react";

const defaultSchema = {
    notes: [],
    files: [],
    links: [],
    images: [],
    videos: [],
    settings: {
      theme: "light",
      language: "en",
    },
  };
  

const useInitializeLocalStorage = () => {
  useEffect(() => {
    const schemaKey = "NoteIt";

    // Check if the schema already exists
    if (!localStorage.getItem(schemaKey)) {
      console.log("Initializing localStorage with default schema...");
      localStorage.setItem(schemaKey, JSON.stringify(defaultSchema));
    } else {
      console.log("Schema already exists in localStorage.");
    }
  }, []);
};

export default useInitializeLocalStorage;
