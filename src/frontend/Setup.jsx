import React, { useState, useEffect } from "react";
import JourneyLocation from "./JourneyLocation";
import Vibes from "./Vibes";
import PlaylistDuration from "./PlaylistDuration";
import VibeImage from "./DisplayScreen";
import { useLocation } from "react-router-dom";

const Setup = () => {
//incriment step
  const [step, setStep] = useState(1);

//state handlers
  const [startText, setStartText] = useState("");
  const [destText, setDestText] = useState("");
  const [vibesText, setVibesText] = useState("Mellow");
  const [playlistDur, setPlaylistDur] = useState(1);
  const [playlistUrl, setPlaylistUrl] = useState('');

  const location = useLocation();

  useEffect(() => { 
    const params = new URLSearchParams(location.search); 
    const url = params.get("playlistUrl"); 
    if (url) { setPlaylistUrl(url); } },
     [location]);

  // Move forward when the next button is clicked
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Move back to the previous step when arrow is clicked
  const handlePreviousStep = () => {
    setStep((prevStep) => Math.max(1, prevStep - 1));
  };

  return (
    <div>
      {step === 1 && (
        <JourneyLocation
          startText={startText}
          destText={destText}
          setStartText={setStartText}
          setDestText={setDestText}
          handleNextStep={handleNextStep}
        />
      )}
      {step === 2 && (
        <PlaylistDuration
          startText={startText}
          destText={destText}
          playlistDur={playlistDur}
          setPlaylistDur={setPlaylistDur}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />
      )}
      {step === 3 && (
        <Vibes
          startText={startText}
          destText={destText}
          vibesText={vibesText}
          setVibesText={setVibesText}
          handleNextStep={handleNextStep}
          handlePreviousStep={handlePreviousStep}
        />
      )}
      {step === 4 && (
        <div>
          <VibeImage vibesText={vibesText} />
<a href={playlistUrl} target="_blank" rel="noopener noreferrer"> Listen on Spotify </a>
        </div>
      )}
    </div>
  );
};

export default Setup;