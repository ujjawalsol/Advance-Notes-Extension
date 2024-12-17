import React from 'react';
import { createHashRouter, RouterProvider, useParams } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import BlankPage from './Components/Storage/BlankPage';
import CodeStorage from './Components/Storage/CodeStorage';
import VideoStorage from './Components/Storage/VideoStorage';
import ImageStorage from './Components/Storage/ImageStorage';
import OtherStorage from './Components/Storage/OtherStorage';
import LinkStorage from './Components/Storage/LinkStorage';
import SavedNotes from './Components/Notes/SavedNotes';
import useInitializeIndexedDB from "./Components/Utils/Model";

const App = () => {
    useInitializeIndexedDB();

    const router = createHashRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                { index: true, element: <Home /> },
                { path: "/edit-note/:id/:noteId?", element: <DynamicPage /> },
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

const DynamicPage = () => {
    const { id } = useParams();

    switch (id) {
        case 'BlankPage':
            return <BlankPage />;
        case 'VideoStorage':
            return <VideoStorage />;
        case 'ImageStorage':
            return <ImageStorage />;
        case 'CodeSpace':
            return <CodeStorage />;
        case 'OtherFiles':
            return <OtherStorage />;
        case 'LinkStorage':
            return <LinkStorage />;
        default:
            return <BlankPage />;
    }
};

export default App;
