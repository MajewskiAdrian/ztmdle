import { use, useEffect, useState } from "react"
import { getStopsFromStop } from "../api/getStops";
//komponent odpowiedzialny za wyświetlanie możliwych zmian przystanku, pobieranie ich z API oraz obsługę błędów i ładowania.
export default function ChangeStop({ currentStop, setCurrentStop }) {
    const [avaliableStops, setAvaliableStops] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchStops = async () => {
            setLoading(true);
            try {
                const stops = await getStopsFromStop(currentStop.stopLat, currentStop.stopLon)
                setAvaliableStops(stops)
                console.log("przystanek: " + currentStop.stopName)
                console.log(avaliableStops)
            } catch (err) {
                setError("Błąd zmiany przystanku: " + err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchStops()
    }, [currentStop])

    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center gap-4 px-2 py-3 pt-6">
                <span className="font-share text-[12px] tracking-[0.4em] text-muted">
                    MOŻLIWE ZMIANY
                </span>
                <div className="h-0.5 flex-1 bg-panel2"></div>
            </div>

            {loading && (
                <p className="font-share text-xs text-muted px-2 py-4">
                    Wyszukiwanie przystanków...
                </p>
            )}

            {!loading && avaliableStops.length === 0 && (
                <p className="font-share text-xs text-muted px-2 py-4">
                    Brak możliwych zmian w pobliżu.
                </p>
            )}

            <div className="grid grid-cols-3 gap-2">
                {avaliableStops.map((stop) => (
                    <button
                        key={stop.stopId}
                        onClick={() => setCurrentStop(stop)}
                        className="relative flex h-24 flex-col items-center justify-center border border-panel2 bg-panel2 hover:bg-white/5 text-text transition-all p-2"
                    >
                        <span className="font-bebas text-sm text-center">
                            {stop.stopName} {stop.stopCode}
                        </span>
                        {stop.distance && (
                            <span className="text-xs text-muted mt-1">
                                {stop.distance} m
                            </span>
                        )}
                        <div className="text-lg">
                            {stop.type === "BUS" ? "🚍" : stop.type === "TRAM" ? "🚊" : "🚍🚊"}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}