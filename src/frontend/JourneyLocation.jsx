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
            <div className='modal-overlay'>
                <div className='modal-content'>
                    <h3>Hi! Where will this journey be taking you?</h3>
                    <div className='modal-label'>
                        <label>
                            Starting Location:
                            <input
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
                                type="text"
                                onChange={(e) => setDestText(e.target.value)}
                                value={destText}
                            />
                        </label>
                    </div>
                    <div className='modal-label'>
                        <button className='button-style' onClick={handleNextStep}>
                            Start Journey
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JourneyLocation;