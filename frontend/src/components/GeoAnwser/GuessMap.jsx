import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { pinIcon, correctStopIcon } from './mapIcons';
import GuessBoundsController from './GuessBoundsController';
// Komponent mapy do zgadywania lokalizacji przystanku.
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onMapClick(lat, lng);
    },
  });
  return null;
}

export default function GuessMap({ positionCenter, markerPos, correctStopPos, onMapClick }) {
  return (
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

        <MapClickHandler onMapClick={onMapClick} />
        
        <GuessBoundsController 
          markerPos={markerPos} 
          correctStopPos={correctStopPos} 
          positionCenter={positionCenter} 
        />

        {markerPos && (
          <Marker position={markerPos} icon={pinIcon} />
        )}
        
        {correctStopPos && (
          <Marker position={correctStopPos} icon={correctStopIcon} />
        )}
           
      </MapContainer>
    </div>
  );
}