// App.jsx
import React, { useState } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import BlankPage from './Components/Storage/BlankPage';
import CodeStorage from './Components/Storage/CodeStorage';
import VideoStorage from './Components/Storage/VideoStorage';
import ImageStorage from './Components/Storage/ImageStorage';
import OtherStorage from './Components/Storage/OtherStorage';
import LinkStorage from './Components/Storage/LinkStorage';
import SavedFiles from './Components/Notes/SavedFiles';
import SavedNotes from './Components/Notes/SavedNotes';
import useInitializeLocalStorage from "./Components/Utils/Model"

const App = () => {
    useInitializeLocalStorage();

    const router = createHashRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                { index: true, element: <Home /> },
                { path: "/edit-note/:id/:noteId?", element: <BlankPage /> },
                { path: 'blank', element: <BlankPage /> },
                { path: 'code', element: <CodeStorage /> },
                { path: 'video', element: <VideoStorage /> },
                { path: 'image', element: <ImageStorage /> },
                { path: 'other', element: <OtherStorage /> },
                { path: 'link', element: <LinkStorage /> },
                { path: '/saved-notes/:id', element: <SavedNotes /> }
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
