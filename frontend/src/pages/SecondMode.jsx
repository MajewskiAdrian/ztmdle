import { useState, useEffect } from 'react';
import Header from '../components/Header/Header.jsx';
import GuessMap from '../components/GeoAnwser/GuessMap.jsx'; 
import GameSidebar from '../components/GeoAnwser/GameSidebar.jsx'; 
import { getStops } from '../api/getStops'; 
import L from 'leaflet';
//Strona drugiego trybu.
export default function SecondMode() {
  const positionCenter = [54.372, 18.62]; 
  
  const [currentRound, setCurrentRound] = useState(1);
  const [totalDistance, setTotalDistance] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

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

  const restartGame = () => {
    setCurrentRound(1);
    setTotalDistance(0);
    setIsGameOver(false);
    fetchAndSelectStop();
  };

  useEffect(() => {
    fetchAndSelectStop();
  }, []);

  const mapClick = (lat, lng) => {
    if (isSubmitted || isGameOver) return;
    setMarkerPos([lat, lng]);
  };

  const checkGuess = () => {
    if (!markerPos || !currentStop) return;

    try {
      const stopLatLng = L.latLng(currentStop.stopLat, currentStop.stopLon);
      const guessLatLng = L.latLng(markerPos[0], markerPos[1]);

      const distanceInMeters = stopLatLng.distanceTo(guessLatLng);
      
      setDistance(distanceInMeters);
      setTotalDistance((prev) => prev + distanceInMeters);
      setCorrectStopPos([currentStop.stopLat, currentStop.stopLon]);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Błąd podczas obliczania odległości:", error);
    }
  };

  const nextRound = () => {
    if (currentRound < 5) {
      setCurrentRound((prev) => prev + 1);
      fetchAndSelectStop();
    } else {
      setIsGameOver(true);
    }
  };

  const formatDistance = (meters) => {
    if (meters < 1000) return `${Math.round(meters)} m`;
    return `${(meters / 1000).toFixed(2)} km`;
  };

  return (
    <>
      <Header />
      <div className="h-[calc(100vh-4rem)] w-full relative">
        <div className="flex flex-col md:flex-row h-full w-full min-h-0 bg-bg">
          
          <GameSidebar 
            currentStop={currentStop}
            distance={distance}
            isSubmitted={isSubmitted}
            markerPos={markerPos}
            currentRound={currentRound}
            totalDistance={totalDistance}
            onCheckGuess={checkGuess}
            onNextRound={nextRound}
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

        {isGameOver && (
          <>
            <div className="fixed inset-0 bg-bg/80 z-1000 animate-fade-in"></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-panel p-8 z-1001 rounded-sm text-center">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-red"></div>
              <h1 className="font-bebas text-6xl text-text mb-5 tracking-wide">
                KONIEC GRY!
              </h1>
              <div className="flex flex-col items-center justify-center bg-panel2/50 border border-muted2/30 p-6">
                <span className="font-bebas text-5xl text-amber">
                  {formatDistance(totalDistance)}
                </span>
                <span className="font-share text-sm tracking-[0.4em] text-muted whitespace-nowrap">
                  SUMA ODLEGLOSCI
                </span>
              </div>
              <button 
                onClick={restartGame}
                className="w-full bg-red hover:bg-red2 text-text font-bebas text-2xl py-5 mt-5 transition-all tracking-widest flex items-center justify-center cursor-pointer" 
              >
                ZAGRAJ PONOWNIE
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}