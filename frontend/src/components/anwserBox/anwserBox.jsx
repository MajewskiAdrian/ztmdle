import "./anwserBox.css";
import { useState, useEffect } from "react";
import { getStopsFromRoute, getRoutesFromStop } from "../../api/getStops";

export default function AnwserBox({
    startStop,
    onCommitMove,
    stopsList,
    setStopsList,
}) {
    const [routesList, setRoutesList] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [selectedStop, setSelectedStop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        if (!startStop) return;

        let cancelled = false;

        setLoading(true);
        setError("");
        setRoutesList([]);
        setSelectedRoute(null);
        setSelectedStop(null);
        setDropdownOpen(false);
        setStopsList([]);

        const fetchRoutes = async () => {
            try {
                const routes = await getRoutesFromStop(startStop.stopId);
                if (cancelled) return;

                const routesWithStopsCheck = await Promise.all(
                    routes.map(async (route) => {
                        try {
                            const stops = await getStopsFromRoute(
                                route.routeId,
                                route.tripId,
                            );

                            const currentStopInRoute = stops.find(
                                (s) => s.stopId == startStop.stopId,
                            );
                            const currentSequence = currentStopInRoute
                                ? Number(currentStopInRoute.stopSequence)
                                : null;

                            const availableStops = stops.filter(
                                (stop) =>
                                    currentSequence == null ||
                                    Number(stop.stopSequence) >= currentSequence,
                            );

                            return availableStops.length > 1 ? route : null;
                        } catch (e) {
                            return null;
                        }
                    }),
                );

                if (!cancelled) {
                    setRoutesList(routesWithStopsCheck.filter(Boolean));
                }
            } catch (e) {
                if (!cancelled) setError("Błąd tras: " + e.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchRoutes();

        return () => {
            cancelled = true;
        };
    }, [startStop, setStopsList]);

    useEffect(() => {
        if (!selectedRoute || !startStop) return;

        let cancelled = false;

        const fetchStops = async () => {
            try {
                const stops = await getStopsFromRoute(
                    selectedRoute.routeId,
                    selectedRoute.tripId,
                );
                if (cancelled) return;

                const currentStopInRoute = stops.find(
                    (stop) => stop.stopId == startStop.stopId,
                );
                const currentSequence = currentStopInRoute
                    ? Number(currentStopInRoute.stopSequence)
                    : null;

                const availableStops = stops.filter(
                    (stop) =>
                        currentSequence == null ||
                        Number(stop.stopSequence) >= currentSequence,
                );

                setStopsList(availableStops);
                setSelectedStop(availableStops[1] || null);
            } catch (e) {
                if (!cancelled) console.error("Błąd przystanków trasy:", e.message);
            }
        };

        fetchStops();

        return () => {
            cancelled = true;
        };
    }, [selectedRoute, startStop, setStopsList]);

    const formatRouteLabel = (routeId) => {
        const routeText = routeId.toString();

        if (routeText.startsWith("40")) {
            return `N${routeText.substring(2)}`;
        }

        if (routeText.startsWith("4") && routeText.length > 1) {
            return `N${routeText.substring(1)}`;
        }

        return routeText;
    };

    if (error)
        return (
            <div className="AnwserBox">
                <p>Błąd: {error}</p>
            </div>
        );
    if (!startStop) return null;

    return (
        <div className="flex flex-col w-full p-4 pt-0">
            <div className="flex items-center gap-4 px-2 py-3">
                <span className="font-share text-[12px] tracking-[0.4em] text-muted">
                    WYBIERZ LINIĘ
                </span>
                <div className="h-0.5 flex-1 bg-panel2"></div>
            </div>

            <div className="grid grid-cols-4 gap-2">
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-24 bg-panel2/50 border border-panel2 rounded-sm animate-pulse flex items-center justify-center"
                        >
                            <div className="h-7 w-12 bg-muted2/20 rounded-xs"></div>
                        </div>
                    ))
                    : routesList.map((route, index) => {
                        const isActive =
                            selectedRoute?.routeId === route.routeId &&
                            selectedRoute?.tripId === route.tripId;
                        return (
                            <button
                                key={index}
                                onClick={() => setSelectedRoute(route)}
                                className={`relative flex h-24 flex-col items-center justify-center border border-panel2 transition-all ${isActive ? "bg-amber2/10 text-bg" : "bg-panel2 hover:bg-white/5 text-text"}`}
                            >
                                <span
                                    className={`font-bebas text-3xl ${isActive ? "text-amber" : "text-text"}`}
                                >
                                    {formatRouteLabel(route.routeId)}
                                </span>
                                <div
                                    className={`absolute bottom-0 h-1 w-full ${isActive ? "bg-amber" : "bg-muted2/40"}`}
                                ></div>
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
                        <div className="flex flex-col bg-panel2 border border-muted2 rounded-sm relative">
                            <div className="relative w-full">
                                <button
                                    type="button"
                                    onClick={() =>
                                        stopsList.length > 0 && setDropdownOpen(!dropdownOpen)
                                    }
                                    className="w-full bg-panel2 p-4 text-text font-bebas text-xl outline-none cursor-pointer uppercase flex items-center justify-between text-left gap-4"
                                >
                                    <div className="flex flex-1 justify-between items-center min-w-0">
                                        {selectedStop && stopsList[0] ? (
                                            <>
                                                <span className="truncate pr-4">
                                                    {selectedStop.stopName} {selectedStop.stopCode || ""}
                                                </span>
                                                <span className="text-amber shrink-0">
                                                    +
                                                    {Math.round(
                                                        (new Date(selectedStop.arrivalTime) -
                                                            new Date(stopsList[0].arrivalTime)) /
                                                        60000,
                                                    )}{" "}
                                                    MIN
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-muted">Wybierz przystanek...</span>
                                        )}
                                    </div>

                                    <span className="text-xs text-muted shrink-0 select-none">
                                        ▼
                                    </span>
                                </button>

                                {dropdownOpen && stopsList.length > 0 && (
                                    <ul className="absolute left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto bg-panel border border-muted2 rounded-sm shadow-xl custom-scrollbar">
                                        {stopsList.map((stop, index) => {
                                            if (index > 0 && stopsList[0]) {
                                                const minutesDiff = Math.round(
                                                    (new Date(stop.arrivalTime) -
                                                        new Date(stopsList[0].arrivalTime)) /
                                                    60000,
                                                );
                                                const isCurrentSelected =
                                                    selectedStop?.stopId === stop.stopId;

                                                return (
                                                    <li
                                                        key={stop.stopId}
                                                        onClick={() => {
                                                            setSelectedStop(stop);
                                                            setDropdownOpen(false);
                                                        }}
                                                        className={`p-4 font-bebas text-xl cursor-pointer uppercase transition-colors border-b border-panel2/30 last:border-0 flex justify-between items-center
                                                            ${isCurrentSelected ? "bg-amber/20 text-amber" : "text-text hover:bg-white/5"}`}
                                                    >
                                                        <span className="truncate pr-4">
                                                            {stop.stopName} {stop.stopCode || ""}
                                                        </span>

                                                        <span
                                                            className={`shrink-0 bg-panel2 p-2 rounded ${isCurrentSelected ? "text-amber" : "text-text"}`}
                                                        >
                                                            +{minutesDiff} MIN
                                                        </span>
                                                    </li>
                                                );
                                            }
                                            return null;
                                        })}
                                    </ul>
                                )}
                            </div>

                            <button
                                onClick={() => {
                                    if (selectedStop && onCommitMove && stopsList[0]) {
                                        const deltaTime =
                                            (new Date(selectedStop.arrivalTime) -
                                                new Date(stopsList[0].arrivalTime)) /
                                            60000;
                                        onCommitMove({
                                            fromStop: startStop,
                                            toStop: selectedStop,
                                            routeId: selectedRoute.routeId,
                                            tripId: selectedRoute.tripId,
                                            routeLabel: formatRouteLabel(selectedRoute.routeId),
                                            deltaTime,
                                        });
                                        setSelectedRoute(null);
                                        setDropdownOpen(false);
                                    }
                                }}
                                className="w-full bg-amber hover:bg-amber2 text-bg font-bebas text-2xl py-4 transition-all tracking-widest border-t border-muted2"
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
