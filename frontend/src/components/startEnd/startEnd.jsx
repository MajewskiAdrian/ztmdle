import './startEnd.css'
import { useState } from 'react'
export default function StartEnd() {
    const [Poczatkowy, setPoczatkowy] = useState('Dworzec Głowny');
    const [Koncowy, setKoncowy] = useState('Swojska');
    return (
        <div className="StartEnd">
            <p>{Poczatkowy} - {Koncowy}</p>
        </div>
    )
}