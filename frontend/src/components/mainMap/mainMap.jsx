import './mainMap.css'
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getStopsFromRoute, getRoutesFromStop } from '../../api/getStops';
import MapBoundsController from './MapBoundsController';

const endDot = L.divIcon({
  className: 'end-dot', 
  iconSize: [16, 16], 
  iconAnchor: [8, 8] 
});

const currentDot = L.divIcon({
  className: 'current-dot', 
  iconSize: [16, 16], 
  iconAnchor: [8, 8] 
});

const startDot = L.divIcon({
  className: 'start-dot', 
  iconSize: [16, 16], 
  iconAnchor: [8, 8] 
});

const availableDot = L.divIcon({
  className: 'available-dot', 
  iconSize: [14, 14], 
  iconAnchor: [8, 8] 
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
                <MapBoundsController startStop={startStop} endStop={endStop} />

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

                {startStop &&
                <Marker position={positionStart} icon={startDot}>
                    <Tooltip direction="top" offset={[0, -5]} opacity={1} permanent={false}>
                        {`START: ${startStop.stopName} ${startStop.stopCode || ''}`.trim()}
                    </Tooltip>
                </Marker>}

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