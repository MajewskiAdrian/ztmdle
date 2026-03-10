import './startEnd.css'
import { useState, useEffect } from 'react'
import { getStops } from '../../api/getStops'

export default function StartEnd() {
    const [Poczatkowy, setPoczatkowy] = useState('Dworzec Głowny');
    const [Koncowy, setKoncowy] = useState('Swojska');

    const [stops, setStops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getStops()
            .then(setStops)
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false))
    }, []);
    
    if (loading) return <p>Ładowanie...</p>
    if (error) return <p>Błąd: {error}</p>

    return (
        <div className="StartEnd">
            {stops.map((s) => (
                <p key={s.stopId}>{s.stopName}</p>
            ))}
            <p>{Poczatkowy} - {Koncowy}</p>
        </div>
    )
}