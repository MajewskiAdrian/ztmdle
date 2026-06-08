import './mainMap.css'
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MapBoundsController from './MapBoundsController';
import GameScoreBox from '../gameHud/GameScoreBox.jsx';
import RouteHistoryBox from '../gameHud/RouteHistoryBox.jsx';
import RouteHistoryModal from '../gameHud/RouteHistoryModal.jsx';

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
// Główny komponent mapy, wyświetlający aktualny przystanek, startowy, końcowy oraz dostępne przystanki na trasie.
export default function MainMap({
    currentStop,
    startStop,
    endStop,
    stopsList,
    timeCount,
    moveHistory,
    historyModalOpen,
    onOpenHistory,
    onCloseHistory,
    onUndoLastMove,
    onJumpToHistoryStep,
}) {
    const positionCenter = [54.372, 18.62]; 
    const positionEnd = endStop ? [endStop.stopLat, endStop.stopLon] : null;
    const positionCurrent = currentStop ? [currentStop.stopLat, currentStop.stopLon] : null;
    const positionStart = startStop ? [startStop.stopLat, startStop.stopLon] : null; 
    
    return (
        <div className="MainMap relative h-full w-full">
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

            <div className="pointer-events-none absolute inset-0 z-1000">
                <div className="pointer-events-auto absolute right-3 top-3 flex flex-col items-end gap-3 sm:right-4 sm:top-4">
                    <GameScoreBox timeCount={timeCount} />

                    <RouteHistoryBox
                        onOpenHistory={onOpenHistory}
                        moveHistory={moveHistory}
                    />

                    <button
                        onClick={onUndoLastMove}
                        disabled={!moveHistory.length}
                        title="Cofnij ostatni ruch"
                        className={`inline-flex items-center gap-2 rounded-sm border px-4 py-2 font-bebas text-lg tracking-widest transition-colors ${
                            moveHistory.length
                                ? 'border-border2 bg-panel/95 text-text hover:bg-panel hover:border-amber/60'
                                : 'cursor-not-allowed border-border2 bg-panel/60 text-text/30'
                        }`}
                    >
                        <span className="text-xl leading-none"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"/></svg></span>
                    </button>

                    
                </div>
            </div>

            <RouteHistoryModal
                open={historyModalOpen}
                moveHistory={moveHistory}
                onClose={onCloseHistory}
                onJumpToStep={(stepIndex) => {
                    onJumpToHistoryStep(stepIndex)
                    onCloseHistory()
                }}
            />
        </div>
    );
}