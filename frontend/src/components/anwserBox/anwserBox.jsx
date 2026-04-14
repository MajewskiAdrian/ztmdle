import './anwserBox.css'
import { useState, useEffect } from 'react'
import { getStopsFromStop } from '../../api/getStops'

export default function AnwserBox({ startStop, onSetCurrentStop }) {
    const [stopsList, setStopsList] = useState([]);
    const [selectedStop, setSelectedStop] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!startStop) return;

        let cancelled = false;
        const fetchData = async () => {
            setLoading(true);
            setError('');
            setStopsList([]);
            setSelectedStop(null);

            try {
                const stopsFromStop = await getStopsFromStop(startStop.stopId);
                if (!cancelled) {
                    setStopsList(stopsFromStop);
                    setSelectedStop(stopsFromStop[0] || null);
                }
            } catch (e) {
                if (!cancelled) {
                    setError(e.message);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };
        fetchData();

        return () => {
            cancelled = true;
        };
    }, [startStop]);

    if (!startStop || loading) return <div className="AnwserBox"><p>Ładowanie...</p></div>;
    if (error) return <div className="AnwserBox"><p>Błąd: {error}</p></div>;

    return (
        <div className="AnwserBox">
            <h4>Wybierz przystanek docelowy:</h4>
            <div className="list">
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
                                onSetCurrentStop(selectedStop)
                            }
                        }}
                    >
                        Ok
                    </button>
                </div>
                {dropdownOpen && (
                    <div className="options">
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
        </div>
    );
}