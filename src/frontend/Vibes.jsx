import React, { useState } from 'react';
import './Styling/Modal.css';
import './Styling/Welcome.css';

const Vibes = ({
   startText,
   destText,
   vibesText,
   setVibesText,
   handlePreviousStep, 
   handleNextStep,
}) => {

    return ( <>
    <div className='background-image'>
    <img src="/gnometrip.png" width={250} height={300} alt="Logo"/>
        <div className='modal-overlay'>
            <div className='modal-content'>
           <h3>What is the vibe of your journey from {startText} to {destText}</h3>
           <div className='modal-label'>
                <select className = 'spinner' value={vibesText} onChange={(e) => setVibesText(e.target.value)}>
  <option value='Mellow'>Mellow</option>
  <option value='DanceParty'>Dance Party</option>
  <option value='Sunshine'>Sunshine</option>
  <option value='Cozy'>Cozy</option>
</select>
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
    )
}
export default Vibes;