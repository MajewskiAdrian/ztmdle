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

    if (!startStop || loading) return <div className="AnwserBox"><p>Ładowanie...</p></div>;
    if (error) return <div className="AnwserBox"><p>Błąd: {error}</p></div>;

    return (
        <div className="AnwserBox">
            <h4>Wybierz linię:</h4>
            <div className="route-selection-container">
                {routesList.map((route, index) => (
                    <button key={index} className={`route-button ${selectedRoute === route ? 'active' : ''}`} onClick={() => setSelectedRoute(route)}>
                        {route.routeId}
                    </button>
                ))}
            </div>
            {selectedRoute && (
                <div className="list">
                    <h4>Wybierz przystanek</h4>
                    <div className="dropdownRow">
                        <button
                            type="button"
                            className="dropdownToggle"
                            onClick={() => setDropdownOpen((prev) => !prev)}
                        >
                            <span>
                                {selectedStop
                                    ? `${selectedStop.stopName} (${selectedStop.stopCode})`
                                    : 'Wybierz przystanek'}
                            </span>
                            <span className={`arrow ${dropdownOpen ? 'open' : ''}`}>▾</span>
                        </button>
                        <button
                            type="button"
                            className="okButton"
                            onClick={() => {
                                if (selectedStop && onSetCurrentStop) {
                                    onSetCurrentStop(selectedStop);
                                    setRouteCount(routeCount + 1);
                                    setSelectedRoute(null);

                                }
                            }}
                        >
                            Ok
                        </button>
                    </div>
                    {dropdownOpen && (
                        <div className="options" >
                            {stopsList.map((stop) => (
                                <div
                                    key={stop.stopId}
                                    className="option"
                                    onClick={() => {
                                        setSelectedStop(stop);
                                        setDropdownOpen(false);
                                    }}
                                >
                                    {stop.stopName} ({stop.stopCode})
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}