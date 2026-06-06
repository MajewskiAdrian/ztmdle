import { useState, useEffect } from 'react';
import Header from '../components/Header/Header.jsx';
import GuessMap from '../components/GeoAnwser/GuessMap.jsx'; 
import GameSidebar from '../components/GeoAnwser/GameSidebar.jsx'; 
import { getStops } from '../api/getStops'; 
import L from 'leaflet';

export default function SecondMode() {
  const positionCenter = [54.372, 18.62]; 
  
  const [currentStop, setCurrentStop] = useState(null);
  const [markerPos, setMarkerPos] = useState(null);
  const [correctStopPos, setCorrectStopPos] = useState(null);
  
  const [distance, setDistance] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fetchAndSelectStop = async () => {
    try {
      const data = await getStops();
      if (data && data.length > 0) {
        setCurrentStop(data[0]); 
        setMarkerPos(null); 
        setCorrectStopPos(null);
        setDistance(null);       
        setIsSubmitted(false);   
      }
    } catch (err) {
      console.error("Błąd podczas pobierania przystanków:", err);
    }
  };

  useEffect(() => {
    fetchAndSelectStop();
  }, []);

  const mapClick = (lat, lng) => {
    if (isSubmitted) return;
    setMarkerPos([lat, lng]);
  };

  const checkGuess = () => {
    if (!markerPos || !currentStop) return;

    try {
      const stopLatLng = L.latLng(currentStop.stopLat, currentStop.stopLon);
      const guessLatLng = L.latLng(markerPos[0], markerPos[1]);

      const distanceInMeters = stopLatLng.distanceTo(guessLatLng);
      
      setDistance(distanceInMeters);
      setCorrectStopPos([currentStop.stopLat, currentStop.stopLon]);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Błąd podczas obliczania odległości:", error);
    }
  };

  const formatDistance = (meters) => {
    if (meters < 1000) return `${Math.round(meters)} m`;
    return `${(meters / 1000).toFixed(2)} km`;
  };

  return (
    <>
      <Header />
      <div className="h-[calc(100vh-4rem)] w-full">
        <div className="flex flex-col md:flex-row h-full w-full min-h-0 bg-bg">
          
          <GameSidebar 
            currentStop={currentStop}
            distance={distance}
            isSubmitted={isSubmitted}
            markerPos={markerPos}
            onCheckGuess={checkGuess}
            onNextRound={fetchAndSelectStop}
            formatDistance={formatDistance}
          />
   
          <main className="flex-1 h-auto md:h-full relative">
            <GuessMap 
              positionCenter={positionCenter} 
              markerPos={markerPos} 
              correctStopPos={correctStopPos} 
              onMapClick={mapClick} 
            />
          </main>

        </div>
      </div>
    </>
  );
}