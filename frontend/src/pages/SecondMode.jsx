import { useState } from 'react'; // ZMIANA: Dodany useState do obsługi znikania
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet'; 
import Header from '../components/Header/Header.jsx';
import GeoAnwser from '../components/GeoAnwser/GeoAnwser.jsx';

export default function SecondMode() {
  const positionCenter = [54.372, 18.62]; 
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
                                Siedlce(testowy)
                            </span>
                        </div>
                    </div>
              </div>

              <GeoAnwser />
            </div>

            <div className="p-4 border-t border-muted2 bg-panel2/40 w-full">
              <button className="w-full bg-red hover:bg-red/90 text-text font-bebas text-2xl tracking-widest py-3.5 text-center cursor-pointer">
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
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />           
              </MapContainer>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}