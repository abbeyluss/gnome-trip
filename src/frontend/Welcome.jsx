import "./Styling/Welcome.css"
import React from "react";
import { NavLink } from "react-router-dom";
export default function Welcome() {
    return (   <>
        <div className="background-image">
            <div className="text-center">
        <img src="/gnometrip.png" width={250} height={300} alt="Logo"/>
        
          <h2>Start Your Journey Today!</h2>
          <NavLink to="/setup" className="button">
          Log in With Spotify
        </NavLink>
          </div>
          </div>
      </>);
}; 