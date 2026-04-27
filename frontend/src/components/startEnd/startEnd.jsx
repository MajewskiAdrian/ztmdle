import './startEnd.css'
import { useState, useEffect } from 'react'
import { getStops } from '../../api/getStops'

export default function StartEnd({ onStartSet, currentStop, onCurrentStopSet, Koncowy, setKoncowy }) {
    const [Poczatkowy, setPoczatkowy] = useState(null);

    const [stops, setStops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getStops()
            .then((data) => {
                setStops(data)
                const start = data[0] || null;
                const end = data[1] || null;

                setPoczatkowy(start)
                setKoncowy(end)

                if (onStartSet) {
                    onStartSet(start)
                }
                if (!currentStop && onCurrentStopSet) {
                    onCurrentStopSet(start)
                }
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false))
    }, []);
    
    if (loading) return <p className="font-share text-xs text-muted">Ładowanie trasy...</p>;
    if (error) return <p className="text-red font-share text-xs">Błąd: {error}</p>;

    return (
        <div className="w-full py-8  bg-panel2 border border-muted2 p-4">
            <div className="flex items-center justify-between w-full">
                
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green flex items-center justify-center">
                        <span className="font-bebas text-bg text-lg">A</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bebas text-xl tracking-wide text-text uppercase">
                            {Poczatkowy ? `${Poczatkowy.stopName} ${Poczatkowy.stopCode || ''}`.trim() : ''}
                        </span>
                    </div>
                </div>

                <div className="flex-1 flex justify-center px-4">
                    <span className="text-muted2 text-xl">-&gt;</span>
                </div>

                <div className="flex items-center gap-3 text-right">
                    <div className="flex flex-col items-end">
                        <span className="font-bebas text-xl tracking-wide text-muted uppercase italic">
                        {Koncowy ? `${Koncowy.stopName} ${Koncowy.stopCode || ''}`.trim() : ''}
                        </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-red flex items-center justify-center">
                        <span className="font-bebas text-text text-lg">B</span>
                    </div>
                </div>

            </div>

        </div>
    );
}
