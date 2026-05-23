import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

export default function MapBoundsController({ startStop, endStop }) {
  const map = useMap(); 

  useEffect(() => {
    if (startStop?.stopLat && startStop?.stopLon && endStop?.stopLat && endStop?.stopLon) {
      
      const bounds = L.latLngBounds([
        [startStop.stopLat, startStop.stopLon],
        [endStop.stopLat, endStop.stopLon]
      ]);

      const timer = setTimeout(() => {
        map.invalidateSize();

        map.fitBounds(bounds, {
          padding: [120, 120],
          maxZoom: 14
        });
      }, 200); 

      return () => clearTimeout(timer);
    }
  }, [startStop, endStop, map]);

  return null;
}