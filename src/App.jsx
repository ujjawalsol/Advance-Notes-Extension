import React from 'react';
import "react-icons/fa"
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import BlankPage from './Components/BlankPage';
import CodeStorage from './Components/CodeStorage';
import VideoStorage from './Components/VideoStorage';
import ImageStorage from './Components/ImageStorage';
import OtherStorage from './Components/OtherStorage';
import LinkStorage from './Components/LinkStorage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blank" element={<BlankPage />} />
        <Route path="/code" element={<CodeStorage />} />
        <Route path='/video' element={<VideoStorage />} />
        <Route path='/image' element={<ImageStorage />} />
        <Route path='/other' element={<OtherStorage />} />
        <Route path='/link' element={<LinkStorage />} />
      </Routes>
    </Router>
  );
};

export default App;
