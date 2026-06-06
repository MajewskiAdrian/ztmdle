import { useState, useEffect } from 'react';
import Header from '../components/Header/Header.jsx';
import GuessMap from '../components/GeoAnwser/GuessMap.jsx'; 
import { getStops } from '../api/getStops'; 

export default function SecondMode() {
  const positionCenter = [54.372, 18.62]; 
  
  const [currentStop, setCurrentStop] = useState(null);
  const [markerPos, setMarkerPos] = useState(null);

  const fetchAndSelectStop = async () => {
    try {
      const data = await getStops();
      if (data && data.length > 0) {
        setCurrentStop(data[0]); 
        setMarkerPos(null); 
      }
    } catch (err) {
      console.error("Błąd podczas pobierania przystanków:", err);
    }
  };

  useEffect(() => {
    fetchAndSelectStop();
  }, []);

  const mapClick = (lat, lng) => {
    setMarkerPos([lat, lng]);
    console.log("Współrzędne w SecondMode:", lat, lng);
  };

  return (
    <>
      <Header />
      <div className="h-[calc(100vh-4rem)] w-full">
        <div className="flex flex-col md:flex-row h-full w-full min-h-0 bg-bg">
          
          <aside className="flex flex-col md:w-120 w-full h-auto md:h-full gap-4 border-t md:border-t-0 md:border-l border-border bg-panel min-h-0 justify-between">
              <div className="w-full py-8 bg-panel2 border border-muted2 p-4">
                  <div className="flex flex-col">
                    <span className="font-share text-xsm tracking-widest text-red pb-1.5 uppercase">
                      Znajdz przystanek
                    </span>
                    <span className="font-bebas text-5xl tracking-wide text-text uppercase">
                      {currentStop ? currentStop.stopName : "Ładowanie..."}
                    </span>
                  </div>
            </div>

            <div className="p-4 border-t border-muted2 bg-panel2/40 w-full">
              <button onClick={fetchAndSelectStop} className="w-full bg-red hover:bg-red/90 text-text font-bebas text-2xl tracking-widest py-3.5 text-center cursor-pointer">
                Zatwierdź
              </button>
            </div>
          </aside>
   
          <main className="flex-1 h-auto md:h-full relative">
            <GuessMap 
              positionCenter={positionCenter} 
              markerPos={markerPos} 
              onMapClick={mapClick} 
            />
          </main>

        </div>
      </div>
    </>
  );
}