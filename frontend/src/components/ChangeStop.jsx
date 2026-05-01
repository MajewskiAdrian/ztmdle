import { use, useEffect, useState } from "react"
import { getStopsFromStop } from "../api/getStops";

export default function changeStop({ currentStop, visible }) {
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

    if (visible = false) return;

    return (
        <div>
            <p className="text-gray-400 text-sm mb-2">Możliwe zmiany:</p>
            <div className="flex flex-wrap gap-3">
                {avaliableStops.map((stop) => (
                    <div
                        key={stop.stopId}
                        className="flex flex-col bg-black p-3 rounded"
                    >
                        <span className="font-normal text-gray-400">
                            {stop.stopName} {stop.stopCode}
                        </span>

                        {stop.distance && (
                            <span className="text-sm text-gray-500">
                                {stop.distance} m
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}