import './mainMap.css'
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const endDot = L.divIcon({
  className: 'end-dot', 
  iconSize: [12, 12],      // rozmiar
  iconAnchor: [6, 6],      // środek kropki
});

const currentDot = L.divIcon({
  className: 'current-dot', 
  iconSize: [12, 12],      // rozmiar
  iconAnchor: [6, 6],      // środek kropki
});

const availableDot = L.divIcon({
  className: 'available-dot', 
  iconSize: [12, 12],      // rozmiar
  iconAnchor: [6, 6],      // środek kropki
});

export default function MainMap() {
    const positionCenter = [54.372, 18.62]; 
    const positionEnd = [54.372, 18.62]; 
    const positionCurrent = [54.32, 18.62]; 
    const availableCurrent = [54.335, 18.62]; 
    return (
        <div className="MainMap">
            <MapContainer 
                center={positionCenter} 
                zoom={12} 
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={positionEnd} icon={endDot}>
                    <Tooltip direction="top" offset={[0, -5]} opacity={1} permanent={false}>
                        Cel
                    </Tooltip>
                </Marker>

                <Marker position={positionCurrent} icon={currentDot}>
                    <Tooltip direction="top" offset={[0, -5]} opacity={1} permanent={false}>
                        Aktualna pozycja
                    </Tooltip>
                </Marker>

                <Marker position={availableCurrent} icon={availableDot}>
                    <Tooltip direction="top" offset={[0, -5]} opacity={1} permanent={false}>
                        Dostępna pozycja
                    </Tooltip>
                </Marker>
            </MapContainer>
        </div>
    );
}