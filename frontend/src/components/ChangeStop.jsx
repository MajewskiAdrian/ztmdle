import { useEffect, useState } from "react"
import { getStopsFromStop } from "../api/getStops";
//komponent odpowiedzialny za wyświetlanie możliwych zmian przystanku, pobieranie ich z API oraz obsługę błędów i ładowania.
export default function ChangeStop({ currentStop, setCurrentStop }) {
    const [avaliableStops, setAvaliableStops] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!currentStop) return;

        const fetchStops = async () => {
            setLoading(true);
            try {
                const stops = await getStopsFromStop(currentStop.stopLat, currentStop.stopLon)
                setAvaliableStops(stops)
            } catch (err) {
                setError("Błąd zmiany przystanku: " + err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchStops()
    }, [currentStop])

    if (error) return <div className="p-4 text-xs text-red-500 font-share">Błąd: {error}</div>;

    return (
        <div className="flex flex-col w-full pt-1">
            <div className="flex items-center gap-4 px-2 py-3 pt-6">
                <span className="font-share text-[12px] tracking-[0.4em] text-muted">
                    MOŻLIWE ZMIANY
                </span>
                <div className="h-0.5 flex-1 bg-panel2"></div>
            </div>

            {!loading && avaliableStops.length === 0 && (
                <p className="font-share text-xs text-muted px-2 py-4">
                    Brak możliwych zmian w pobliżu.
                </p>
            )}

            <div className="grid grid-cols-3 gap-2">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div 
                            key={i} 
                            className="h-24 bg-panel2/50 border border-panel2 rounded-sm animate-pulse flex flex-col items-center justify-center gap-2 p-2"
                        >
                            <div className="h-4 w-20 bg-muted2/20 rounded-xs"></div>
                            <div className="h-6 w-6 bg-muted2/20 rounded-full"></div>
                        </div>
                    ))
                ) : (
                    avaliableStops.map((stop) => (
                        <button
                            key={stop.stopId}
                            onClick={() => setCurrentStop(stop)}
                            className="relative flex h-24 flex-col items-center justify-center border border-panel2 bg-panel2 hover:bg-white/5 text-text transition-all p-2"
                        >
                            <span className="font-bebas text-sm text-center line-clamp-2 pr-1 pl-1">
                                {stop.stopName} {stop.stopCode}
                            </span>
                            <div className="text-lg mt-1">
                                {stop.type === "BUS" ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-120q-17 0-28.5-11.5T200-160v-82q-18-20-29-44.5T160-340v-380q0-83 77-121.5T480-880q172 0 246 37t74 123v380q0 29-11 53.5T760-242v82q0 17-11.5 28.5T720-120h-40q-17 0-28.5-11.5T640-160v-40H320v40q0 17-11.5 28.5T280-120h-40Zm242-640h224-448 224Zm158 280H240h480-80Zm-400-80h480v-120H240v120Zm142.5 222.5Q400-355 400-380t-17.5-42.5Q365-440 340-440t-42.5 17.5Q280-405 280-380t17.5 42.5Q315-320 340-320t42.5-17.5Zm280 0Q680-355 680-380t-17.5-42.5Q645-440 620-440t-42.5 17.5Q560-405 560-380t17.5 42.5Q595-320 620-320t42.5-17.5ZM258-760h448q-15-17-64.5-28.5T482-800q-107 0-156.5 12.5T258-760Zm62 480h320q33 0 56.5-23.5T720-360v-120H240v120q0 33 23.5 56.5T320-280Z"/></svg>
                                ) : stop.type === "TRAM" ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-260v-380q0-97 85-127t195-33l30-60H280v-60h400v60H550l-30 60q119 3 199.5 32.5T800-640v380q0 59-40.5 99.5T660-120l60 60v20h-80l-80-80H400l-80 80h-80v-20l60-60q-59 0-99.5-40.5T160-260Zm500-140H240h480-60ZM522.5-257.5Q540-275 540-300t-17.5-42.5Q505-360 480-360t-42.5 17.5Q420-325 420-300t17.5 42.5Q455-240 480-240t42.5-17.5ZM478-680h228-450 222ZM240-480h480v-120H240v120Zm60 280h360q26 0 43-17t17-43v-140H240v140q0 26 17 43t43 17Zm178-520q-134 0-172 14.5T256-680h450q-12-14-52-27t-176-13Z"/></svg>
                                ) : (
                                    <div className="flex gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-120q-17 0-28.5-11.5T200-160v-82q-18-20-29-44.5T160-340v-380q0-83 77-121.5T480-880q172 0 246 37t74 123v380q0 29-11 53.5T760-242v82q0 17-11.5 28.5T720-120h-40q-17 0-28.5-11.5T640-160v-40H320v40q0 17-11.5 28.5T280-120h-40Zm242-640h224-448 224Zm158 280H240h480-80Zm-400-80h480v-120H240v120Zm142.5 222.5Q400-355 400-380t-17.5-42.5Q365-440 340-440t-42.5 17.5Q280-405 280-380t17.5 42.5Q315-320 340-320t42.5-17.5Zm280 0Q680-355 680-380t-17.5-42.5Q645-440 620-440t-42.5 17.5Q560-405 560-380t17.5 42.5Q595-320 620-320t42.5-17.5ZM258-760h448q-15-17-64.5-28.5T482-800q-107 0-156.5 12.5T258-760Zm62 480h320q33 0 56.5-23.5T720-360v-120H240v120q0 33 23.5 56.5T320-280Z"/></svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-260v-380q0-97 85-127t195-33l30-60H280v-60h400v60H550l-30 60q119 3 199.5 32.5T800-640v380q0 59-40.5 99.5T660-120l60 60v20h-80l-80-80H400l-80 80h-80v-20l60-60q-59 0-99.5-40.5T160-260Zm500-140H240h480-60ZM522.5-257.5Q540-275 540-300t-17.5-42.5Q505-360 480-360t-42.5 17.5Q420-325 420-300t17.5 42.5Q455-240 480-240t42.5-17.5ZM478-680h228-450 222ZM240-480h480v-120H240v120Zm60 280h360q26 0 43-17t17-43v-140H240v140q0 26 17 43t43 17Zm178-520q-134 0-172 14.5T256-680h450q-12-14-52-27t-176-13Z"/></svg>
                                    </div>
                                )}
                            </div>
                            {stop.distance && (
                                <span className="text-xs text-muted mt-1 font-share">
                                    {stop.distance} m
                                </span>
                            )}
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}