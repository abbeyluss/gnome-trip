import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './fonts/IndieFlower-Regular.ttf'
import JourneyLocation from './frontend/JourneyLocation';
import Welcome from './frontend/Welcome';
import Vibes from './frontend/Vibes';
import PlaylistDuration from './frontend/playlistDuration';
import Setup from './frontend/setup';

function App() {

  return (
    <Welcome/>
  )
}

export default App
