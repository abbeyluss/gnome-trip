import "./Styling/Welcome.css"
import React from "react";

export default function Display() {
    return (   <>
        <div className="background-image">
        <img src="/gnometrip.png" width={250} height={300} alt="Logo"/>
            <div className="text-center">
          <h2>Hi Friends!</h2>
          </div>
          </div>
      </>);
};