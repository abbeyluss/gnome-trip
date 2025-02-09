import React from "react";
import "./Styling/Welcome.css"
import "./Styling/Display.css"
 import mellowImg from "./images/mellow.png";
 import dancePartyImg from "./images/danceparty.png";
 import cozyImg from "./images/cozy.png";
// import mellowbg from "./images/mellowbg.png";
// import dancePartybg from "./images/dancepartybg.png";
// import cozybg from "./images/cozybg.png";

const VibeImage = ({ vibesText }) => {
  const vibeGnome = {
    Mellow: mellowImg,
    DanceParty: dancePartyImg,
    Cozy: cozyImg,
  };
//   const vibeBackground = {
//     Melancholy: melancholybg,
//     DanceParty: dancePartybg,
//     Cozy: cozybg,
//   };

  return (
    <div className="background-image">
         <img src="/gnometrip.png" width={250} height={300} alt="Logo"/>
        <div className='gnome'>
      <img src={vibeGnome[vibesText]} alt={vibesText} width="500" height="500" />
    </div>
    </div>
  );
};

export default VibeImage;