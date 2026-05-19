import { use, useEffect, useState } from "react"
import { getStopsFromStop } from "../api/getStops";

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
        <div>
            <p className="text-gray-400 text-sm mb-2">Możliwe zmiany:</p>
            <div className="flex flex-wrap gap-3">
                {avaliableStops.map((stop) => (
                    <div
                        onClick={() => { setCurrentStop(stop) }}
                        key={stop.stopId}
                        className="flex flex-row bg-black text-gray-400 p-3 rounded hover:bg-amber2 hover:text-black cursor-pointer transition duration-300 ease-in-out"
                    >
                        <div
                            className="flex flex-col"
                        >
                            <span className="font-normal">
                                {stop.stopName} {stop.stopCode}
                            </span>

                            {stop.distance && (
                                <span className="text-sm">
                                    {stop.distance} m
                                </span>
                            )}
                        </div>
                        <div className="">
                            {stop.type && (
                                <span className="align-text-middle">
                                    {stop.type == "BUS" ? "🚍" : stop.type == "TRAM" ? "🚊" : "🚍🚊"}
                                </span>
                            )}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}