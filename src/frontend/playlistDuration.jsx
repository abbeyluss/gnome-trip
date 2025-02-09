import React, { useState } from 'react';
import './Styling/Modal.css';
import './Styling/Welcome.css';

const PlaylistDuration = ({
    startText,
    destText,
    playlistDur,
    setPlaylistDur,
    handleNextStep,
    handlePreviousStep, 
 }) => {
     return ( <>
     <div className='background-image'>
     <img src="/gnometrip.png" width={250} height={300} alt="Logo"/>
         <div className='modal-overlay'>
             <div className='modal-content'>
            <h3>How long is your journey from {startText} to {destText}</h3>
            <div className='modal-label'>
            <label>Trip Duration
<input 
className='spinner'
type="number" 
min="1" 
max="5"
onChange={(e) => setPlaylistDur(e.target.value)}
/>
</label>

                  </div>
             <div className='modal-label'>
             <button className='button-style' onClick={handlePreviousStep}>
                 Reset Trip
             </button>
             <button className='button-style' onClick={handleNextStep}>
                 Generate Playlist
             </button>
             </div>
             </div>
             </div>
             </div>
         </>
     );
 };

 export default PlaylistDuration;