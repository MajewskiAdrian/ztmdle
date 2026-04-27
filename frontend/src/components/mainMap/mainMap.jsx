import './mainMap.css'
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getStopsFromRoute, getRoutesFromStop } from '../../api/getStops';

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

const startDot = L.divIcon({
  className: 'start-dot', 
  iconSize: [12, 12],      // rozmiar
  iconAnchor: [6, 6],      // środek kropki
});

const availableDot = L.divIcon({
  className: 'available-dot', 
  iconSize: [10, 10],
  iconAnchor: [5, 5],
});

export default function MainMap({currentStop, startStop, endStop, stopsList}) {
    const positionCenter = [54.372, 18.62]; 
    const positionEnd = endStop ? [endStop.stopLat, endStop.stopLon] : null;
    const positionCurrent = currentStop ? [currentStop.stopLat, currentStop.stopLon] : null;
    const positionStart = startStop ? [startStop.stopLat, startStop.stopLon] : null; 
    return (
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
                {startStop &&
                <Marker position={positionStart} icon={startDot}>
                    <Tooltip direction="top" offset={[0, -5]} opacity={1} permanent={false}>
                        {`START: ${startStop.stopName} ${startStop.stopCode || ''}`.trim()}
                    </Tooltip>
                </Marker>}

                {endStop && 
                <Marker position={positionEnd} icon={endDot}>
                    <Tooltip direction="top" offset={[0, -5]} opacity={1} permanent={false}>
                        {`CEL: ${endStop.stopName} ${endStop.stopCode || ''}`.trim()}
                    </Tooltip>
                </Marker>
                }

                {currentStop && 
                <Marker position={positionCurrent} icon={currentDot}>
                    <Tooltip direction="top" offset={[0, -5]} opacity={1} permanent={false}>
                        {`${currentStop.stopName} ${currentStop.stopCode || ''}`.trim()}
                    </Tooltip>
                </Marker>
                }

                {stopsList && stopsList.map((stop) => (
                <Marker position={[stop.stopLat, stop.stopLon]} icon={availableDot} key={`${stop.stopId}-${stop.stopSequence || stop.routeId}`}>
                    <Tooltip direction="top" offset={[0, -5]}>
                        {`${stop.stopName} ${stop.stopCode || ''}`.trim()}
                    </Tooltip>
                </Marker>
                ))}
                
                
            </MapContainer>
        </div>
    );
}