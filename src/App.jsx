import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './fonts/IndieFlower-Regular.ttf';
import Welcome from './frontend/Welcome';
import Setup from './frontend/setup';
import Display from './frontend/DisplayScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/display" element={<Display/>} />
      </Routes>
    </Router>
  );
}

export default App;
