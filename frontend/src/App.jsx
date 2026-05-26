import { useState } from 'react'
import './index.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import FreePlay from './pages/FreePlay.jsx'
import SecondMode from './pages/SecondMode.jsx'
import { useGameWinLogic } from './hooks/useGameWinLogic.jsx'

function App() {
  const [poczatkowy, setPoczatkowy] = useState(null)
  const [currentStop, setCurrentStop] = useState(null)
  const [Koncowy, setKoncowy] = useState(null)
  const [routeCount, setRouteCount] = useState(0)
  const [showWinMessage, setShowWinMessage, WinMessage] = useGameWinLogic(currentStop, Koncowy, routeCount)
  const [stopsList, setStopsList] = useState([])

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/freeplay"
        element={
          <FreePlay
            poczatkowy={poczatkowy}
            setPoczatkowy={setPoczatkowy}
            currentStop={currentStop}
            setCurrentStop={setCurrentStop}
            Koncowy={Koncowy}
            setKoncowy={setKoncowy}
            routeCount={routeCount}
            setRouteCount={setRouteCount}
            stopsList={stopsList}
            setStopsList={setStopsList}
            WinMessage={WinMessage}
          />
        }
      />
      <Route path="/second-mode" element={<SecondMode />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
