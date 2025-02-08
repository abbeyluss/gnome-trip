import "./Styling/Welcome.css"
export default function Welcome() {
    return (   <>
        <div className="background-image">
            <div className="text-center">
        <img src="/gnometrip.png" width={250} height={300} alt="Logo"/>
        
          <h2>Start Your Journey Today!</h2>
          <button>Log in with Spotify</button>
          </div>
          </div>
      </>);
}; 