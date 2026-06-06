import L from 'leaflet';

export const pinIcon = L.divIcon({
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
  className: 'pin-icon', 
  iconSize: [40, 44],       
  iconAnchor: [20, 42]
});

export const correctStopIcon = L.divIcon({
  html: `
    <div class="relative flex items-center justify-center">
      <svg class="w-10 h-10 drop-shadow-[0_4px_5px_rgba(0,0,0,0.35)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M12 21.5C12 21.5 19 14.5 19 9.5C19 5.63401 15.866 2.5 12 2.5C8.13401 2.5 5 5.63401 5 9.5C5 14.5 12 21.5 12 21.5Z" 
          fill="#10b981" 
          stroke="white" 
          stroke-width="2" 
          stroke-linejoin="round"
        />
      </svg>
    </div>
  `,
  className: 'correct-stop-icon', 
  iconSize: [40, 44],       
  iconAnchor: [20, 42]
});