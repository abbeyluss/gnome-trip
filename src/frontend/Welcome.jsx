import "./Styling/Welcome.css";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import mellowbg from "./images/mellowbg.png";
import dancePartybg from "./images/dancepartybg.png";
import cozybg from "./images/cozybg.png";

import mellowImg from "./images/mellow.png";
import dancePartyImg from "./images/danceparty.png";
import cozyImg from "./images/cozy.png";

export default function Welcome() {
  // Store backgrounds and gnome images in arrays
  const backgrounds = [mellowbg, dancePartybg, cozybg];
  const gnomes = [mellowImg, dancePartyImg, cozyImg];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSpotifyLogin = async () => {
      window.location.href = "http://localhost:5001/";
    };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${backgrounds[currentIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 2s ease-in-out",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="text-center">
        <img src="/gnometrip.png" width={250} height={300} alt="Logo" />

        <div className="gnome-container">
          <img
            src={gnomes[currentIndex]} 
            alt="Gnome"
            width={300} 
            height={300}
            className="gnome-image"
          />
        </div>

        <h2>Start Your Journey Today!</h2>
        <button onClick={handleSpotifyLogin}>
          Log in With Spotify
        </button>
      </div>
    </div>
  );
}