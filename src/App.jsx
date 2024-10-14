import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import BlankPage from './Components/BlankPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blank" element={<BlankPage />} />
      </Routes>
    </Router>
  );
};

export default App;
