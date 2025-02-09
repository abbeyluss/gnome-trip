import React, { useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
export default function SpotifyCallback() { 
    const navigate = useNavigate(); 
    useEffect(() => { const urlParams = new URLSearchParams(window.location.search); 
        const code = urlParams.get("code"); if (code) { 
            axios
             .get(`http://localhost:5001/callback?code=${code}`, { withCredentials: true }) 
             .then(() => navigate("/setup")) 
             .catch((error) => console.error("Spotify authentication failed:", error)); } }
             , [navigate]); 
             
             return <div>Authenticating...</div>; }