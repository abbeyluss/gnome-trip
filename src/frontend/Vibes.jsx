import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Styling/Modal.css';
import './Styling/Welcome.css';

const Vibes = ({
   startText,
   destText,
   vibesText,
   setVibesText,
   handlePreviousStep, 
}) => {

    return ( <>
    <div className='background-image'>
        <div className='modal-overlay'>
            <div className='modal-content'>
           <h3>What is the vibe of your journey from {startText} to {destText}</h3>
           <div className='modal-label'>
                <select value={vibesText} onChange={(e) => setVibesText(e.target.value)}>
  <option value="Melancholy">Melancholy</option>
  <option value="DanceParty">Dance Party</option>
  <option value="Rage">Rage</option>
</select>
            </div>
            <div className='modal-label'>
            <button className='button-style' onClick={handlePreviousStep}>
                Reset Trip
            </button>
            <NavLink to="/display" className="button">
            Generate Playlist
        </NavLink>
            </div>
            </div>
            </div>
        </div>
        </>
    )
}
export default Vibes;