import React, { useState } from 'react';
import './Styling/Modal.css';
import './Styling/Welcome.css';
import { Slider } from '@mui/material';

const PlaylistDuration = ({
    startText,
    destText,
    playlistMin,
    playlistMax,
    setPlaylistMin,
    setPlaylistMax,
    handleNextStep,
    handlePreviousStep, 
 }) => {
    const [sliderValue, setSliderValue] = useState([playlistMin, playlistMax]);
    const handleChange = (event, newValue) => {
        setSliderValue(newValue); 
        setPlaylistMin(newValue[0]);
        setPlaylistMax(newValue[1]);
    };
     return ( <>
     <div className='background-image'>
         <div className='modal-overlay'>
             <div className='modal-content'>
            <h3>How long is your journey from {startText} to {destText}</h3>
            <div className='modal-label'>
            <Slider
  getAriaLabel={() => 'Range of Time'}
  value={sliderValue}
  onChange={handleChange}
  valueLabelDisplay="auto"
  min={1}
  max={30}
/>
             </div>
             <div className='modal-label'>
             <button className='button-style' onClick={handleNextStep}>
                 Generate Playlist
             </button>
             <button className='button-style' onClick={handlePreviousStep}>
                 Reset Trip
             </button>
             </div>
             </div>
             </div>
         </div>
         </>
     );
 };

 export default PlaylistDuration;