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
    
    if (loading) return <p>Ładowanie...</p>
    if (error) return <p>Błąd: {error}</p>

    // wyświetl: początkowy i końcowy
    return (
        <div className="StartEnd">
            <div className="stopSummary">
                <p>
                    {Poczatkowy ? `${Poczatkowy.stopName} ${Poczatkowy.stopCode || ''}`.trim() : ''}
                    {' - '}
                    {Koncowy ? `${Koncowy.stopName} ${Koncowy.stopCode || ''}`.trim() : ''}
                </p>
            </div>
        </div>
    )
}