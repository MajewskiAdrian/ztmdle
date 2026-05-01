import './anwserBox.css'
import { useState, useEffect } from 'react'
import { getStopsFromRoute, getRoutesFromStop } from '../../api/getStops';


export default function AnwserBox({ startStop, onSetCurrentStop, routeCount, setRouteCount, stopsList, setStopsList }) {
    const [routesList, setRoutesList] = useState([]);
    //const [stopsList, setStopsList] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [selectedStop, setSelectedStop] = useState(null);
    const [stopSequenceInRoute, setStopSequenceInRoute] = useState(null);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!startStop) return;

        const fetchRoutes = async () => {
            setLoading(true);
            try {
                const routes = await getRoutesFromStop(startStop.stopId);
                // console.log("Przyst:", startStop.stopName);
                // console.table(routes); 
                setRoutesList(routes);
                setStopsList([]);
                setSelectedRoute(null);
            } catch (e) {
                setError("Błąd tras: " + e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRoutes();
    }, [startStop]);// ważne, bo to tak naprawde jest currentStop z app.jsx tylko ktoś to tak nazwał XD

    useEffect(() => {
        if (!selectedRoute) return;

        const fetchStops = async () => {
            try {
                const stops = await getStopsFromRoute(selectedRoute.routeId, selectedRoute.tripId);

                const currentStopInRoute = stops.find(
                    (stop) => stop.stopId == startStop.stopId
                );

                const currentSequence = currentStopInRoute
                    ? Number(currentStopInRoute.stopSequence)
                    : null;

                const availableStops = stops.filter(
                    (stop) =>
                        currentSequence == null ||
                        Number(stop.stopSequence) > currentSequence
                );

                setStopsList(availableStops);
                setStopSequenceInRoute(currentSequence);
                setSelectedStop(availableStops[0] || null);
            } catch (e) {
                console.error("Błąd przystanków trasy:", e.message);
            }
        };
        fetchStops();
    }, [selectedRoute, startStop]);
    if (!startStop || loading) return <div className="p-4 font-share text-xs animate-pulse text-amber">Ładowanie linii...</div>;
    if (error) return <div className="AnwserBox"><p>Błąd: {error}</p></div>;

   return (
        <div className="flex flex-col w-full p-4 pt-0">
            <div className="flex items-center gap-4 px-2 py-3">
                <span className="font-share text-[12px] tracking-[0.4em] text-muted">
                    WYBIERZ LINIĘ
                </span>
                <div className="h-0.5 flex-1 bg-panel2"></div>
            </div>

            <div className="grid grid-cols-4 gap-2">
                {routesList.map((route, index) => {
                    const isActive = selectedRoute?.routeId === route.routeId;

                    return (
                        <button
                            key={index}
                            onClick={() => setSelectedRoute(route)}
                            className={`relative flex h-24 flex-col items-center justify-center border border-panel2 transition-all ${isActive ? 'bg-amber2/10 text-bg' : 'bg-panel2 hover:bg-white/5 text-text'}`}>
                            <span className={`font-bebas text-3xl ${isActive ? 'text-amber' : 'text-text'}`}>
                                {route.routeId}
                            </span>
                            <div className={`absolute bottom-0 h-1 w-full ${isActive ? 'bg-amber' : 'bg-muted2/40'}`}></div>
                        </button>
                    );
                })}
            </div>

            {selectedRoute && (
                <div className="flex flex-col w-full ">
                    <div className="flex items-center gap-4 px-2 py-3 pt-6">
                        <span className="font-share text-[12px] tracking-[0.4em] text-muted">
                            PRZYSTANEK DOCELOWY
                        </span>
                        <div className="h-0.5 flex-1 bg-panel2"></div>
                    </div>

                    <div className="pb-8">
                        <div className="flex flex-col bg-panel2 border border-muted2 rounded-sm overflow-hidden">
                            <select 
                                className="bg-panel2 p-4 text-text font-bebas text-xl outline-none cursor-pointer uppercase appearance-none"
                                value={selectedStop?.stopId || ''}
                                onChange={(e) => {
                                    const stop = stopsList.find(s => s.stopId == e.target.value);
                                    setSelectedStop(stop);
                                }}
                            >
                                {stopsList.map((stop) => (
                                    <option key={stop.stopId} value={stop.stopId} className="bg-panel2 text-text">
                                        {stop.stopName} {stop.stopCode}
                                    </option>
                                ))}
                            </select>
                            
                            <button
                                onClick={() => {
                                    if (selectedStop && onSetCurrentStop) {
                                        onSetCurrentStop(selectedStop);
                                        setRouteCount(routeCount + 1);
                                        setSelectedRoute(null);
                                    }
                                }}
                                className="w-full bg-amber hover:bg-amber2 text-bg font-bebas text-2xl py-4 transition-all tracking-widest"
                            >
                                JEDŹ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}