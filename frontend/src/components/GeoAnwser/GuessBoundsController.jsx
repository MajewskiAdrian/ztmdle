import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

export default function GuessBoundsController({ markerPos, correctStopPos, positionCenter }) {
  const map = useMap();

  useEffect(() => {
    if (markerPos && correctStopPos) {
      const bounds = L.latLngBounds([
        [markerPos[0], markerPos[1]],
        [correctStopPos[0], correctStopPos[1]]
      ]);

      const timer = setTimeout(() => {
        map.invalidateSize();
        map.fitBounds(bounds, {
          padding: [90, 90],
          maxZoom: 14     
        });
      }, 100);

      return () => clearTimeout(timer);
    } else if (!markerPos && !correctStopPos) {
      map.setView(positionCenter, 11);
    }
  }, [markerPos, correctStopPos, positionCenter, map]);

  return null;
}