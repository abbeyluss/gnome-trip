import React from 'react';
import './Styling/Modal.css';
import './Styling/Welcome.css';

const JourneyLocation = ({
    startText,
    destText,
    setStartText,
    setDestText,
    handleNextStep,
}) => {
    return (
        <div className='background-image'>
             <img src="/gnometrip.png" width={250} height={300} alt="Logo"/>
            <div className='modal-overlay'>
                <div className='modal-content'>
                    <h3>Where will this journey be taking you?</h3>
                    <div className='modal-label'>
                        <label>
                            Starting Location:
                               <input
                                className='input'
                                type="text"
                                onChange={(e) => setStartText(e.target.value)}
                                value={startText}
                            />
                        </label>
                    </div>
                    <div className='modal-label'>
                        <label>
                            Destination:
                            <input
                                className='input'
                                type="text"
                                onChange={(e) => setDestText(e.target.value)}
                                value={destText}
                            />
                        </label>
                    </div>
                    <div className='modal-label'>
                        <button className='button-style' onClick={handleNextStep}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JourneyLocation;