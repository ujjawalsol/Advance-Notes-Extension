// App.jsx
import React, { useState } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home';
import BlankPage from './Components/BlankPage';
import CodeStorage from './Components/CodeStorage';
import VideoStorage from './Components/VideoStorage';
import ImageStorage from './Components/ImageStorage';
import OtherStorage from './Components/OtherStorage';
import LinkStorage from './Components/LinkStorage';
import SavedFiles from './Components/SavedFiles';
import SavedNotes from './Components/SavedNotes';

const App = () => {

    const router = createHashRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                { index: true, element: <Home /> },
                { path: 'blank', element: <BlankPage /> },
                { path: 'code', element: <CodeStorage /> },
                { path: 'video', element: <VideoStorage /> },
                { path: 'image', element: <ImageStorage /> },
                { path: 'other', element: <OtherStorage /> },
                { path: 'link', element: <SavedNotes /> },
                { path: 'saved', element: <SavedFiles /> }
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
