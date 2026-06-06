import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'; 
import L from 'leaflet'; 
import Header from '../components/Header/Header.jsx';
import GeoAnwser from '../components/GeoAnwser/GeoAnwser.jsx';
import { getStops } from '../api/getStops'; 

// To jest ikonka pinezki jak coś
const pinIcon = L.divIcon({
  html: `
    <div class="relative flex items-center justify-center">
      <svg class="w-10 h-10 drop-shadow-[0_4px_5px_rgba(0,0,0,0.35)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M12 21.5C12 21.5 19 14.5 19 9.5C19 5.63401 15.866 2.5 12 2.5C8.13401 2.5 5 5.63401 5 9.5C5 14.5 12 21.5 12 21.5Z" 
          fill="#f59e0b" 
          stroke="white" 
          stroke-width="2" 
          stroke-linejoin="round"
        />
      </svg>
    </div>
  `,
  className: 'custom-geoguessr-icon', 
  iconSize: [40, 44],       
  iconAnchor: [20, 42]
});

export default function SecondMode() {
  const positionCenter = [54.372, 18.62]; 
  
  const [currentStop, setCurrentStop] = useState(null);
  const [markerPos, setMarkerPos] = useState(null);

  const handleFetchAndSelectStop = async () => {
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
    handleFetchAndSelectStop();
  }, []);

  function MapClickHandler() {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setMarkerPos([lat, lng]);
        console.log("Kliknięte współrzędne:", lat, lng);
      },
    });
    return null;
  }

  return (
    <>
      <Header />
      <div className="h-[calc(100vh-4rem)] w-full">
        <div className="flex flex-col md:flex-row h-full w-full min-h-0 bg-bg">
          <aside className="flex flex-col md:w-120 w-full h-auto md:h-full gap-4 border-t md:border-t-0 md:border-l border-border bg-panel min-h-0 justify-between">

            <div className="flex flex-col gap-4 w-full">
              <div className="w-full py-8 bg-panel2 border border-muted2 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <span className="font-share text-xsm tracking-widest text-red pb-1.5 uppercase">
                                Znajdz przystanek
                            </span>
                            <span className="font-bebas text-5xl tracking-wide text-text uppercase">
                                {currentStop ? currentStop.stopName : "Ładowanie..."}
                            </span>
                        </div>
                    </div>
              </div>
              <GeoAnwser />
            </div>

            <div className="p-4 border-t border-muted2 bg-panel2/40 w-full">
              <button onClick={handleFetchAndSelectStop} className="w-full bg-red hover:bg-red/90 text-text font-bebas text-2xl tracking-widest py-3.5 text-center cursor-pointer">
                Zatwierdź
              </button>
            </div>

          </aside>
   
          <main className="flex-1 h-auto md:h-full relative">

            <div className="MainMap h-full w-full">
              <MapContainer 
                center={positionCenter} 
                zoom={11} 
                scrollWheelZoom={true}
                className="h-full w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />      

                <MapClickHandler />

                {markerPos && (
                  <Marker 
                    position={markerPos} 
                    icon={pinIcon} 
                  />
                )}
                   
              </MapContainer>
            </div>
            
          </main>
        </div>
      </div>
    </>
  );
}