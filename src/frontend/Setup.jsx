import React, {useState} from "react";
import JourneyLocation from "./JourneyLocation";
import Vibes from "./Vibes";
import PlaylistDuration from "./playlistDuration";
import VibeImage from "./DisplayScreen";

const Setup = () => {
    //moving from step to step
    const [step, setStep] = useState(1);

    //state variables for individual steps of generation process
    const [startText, setStartText] = useState('');
    const [destText, setDestText] = useState('');
    const [vibesText, setVibesText] = useState('Melancholy');
    const [playlistDur, setPlaylistDur] = useState(1);

    //move forward when the next button is selected
    const handleNextStep = () => {
        setStep(step + 1);
      };

      //move back to previos step when arrow is clicked
    const handlePreviousStep = () => {
        setStep(step - 1);
        console.log("Current step:", step);
      };
    return (
        <div>
            {step === 1 && (
        <JourneyLocation
        startText={startText}
        destText={destText}
        setStartText={setStartText}  // Add this
        setDestText={setDestText}
        handleNextStep={handleNextStep} />
      )}
      {step === 2 && (
        <PlaylistDuration
        startText={startText}
        destText={destText}
        playlistDur={playlistDur}
        setPlaylistDur={setPlaylistDur}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep} />
      )} {step === 3 && (        <Vibes
        startText={startText}
        destText={destText}
        vibesText={vibesText}
        setVibesText={setVibesText}
        handleNextStep={handleNextStep}
        handlePreviousStep={handlePreviousStep} />)}
        {step === 4 && (        <VibeImage
        vibesText={vibesText} />)}
        </div>
    );
};
export default Setup;