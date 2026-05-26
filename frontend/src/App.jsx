import { useState, useEffect } from 'react'
import './index.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import FreePlay from './pages/FreePlay.jsx'
import SecondMode from './pages/SecondMode.jsx'
import Profile from './pages/Profile.jsx'
import { useGameWinLogic } from './hooks/useGameWinLogic.jsx'

const COOKIE_NAME = 'ztmdleGame'

function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

function setCookie(name, value, days = 30) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

function readSavedGame() {
  const raw = getCookie(COOKIE_NAME)
  if (!raw) return null
  try {
    return JSON.parse(decodeURIComponent(raw))
  } catch {
    return null
  }
}

function clearGameCookie() {
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`
}

function App() {
  const savedGame = readSavedGame()
  const [poczatkowy, setPoczatkowy] = useState(savedGame?.poczatkowy ?? null)
  const [currentStop, setCurrentStop] = useState(savedGame?.currentStop ?? null)
  const [Koncowy, setKoncowy] = useState(savedGame?.Koncowy ?? null)
  const [routeCount, setRouteCount] = useState(savedGame?.routeCount ?? 0)
  const [timeCount, setTimeCount] = useState(savedGame?.timeCount ?? 0)
  const [showWinMessage, setShowWinMessage, WinMessage] = useGameWinLogic(currentStop, Koncowy, routeCount, timeCount, clearGameCookie)
  const [stopsList, setStopsList] = useState([])

  useEffect(() => {
    const gameData = {
      poczatkowy,
      currentStop,
      Koncowy,
      routeCount,
      timeCount
    }
    setCookie(COOKIE_NAME, JSON.stringify(gameData), 30)
  }, [poczatkowy, currentStop, Koncowy, routeCount, timeCount])

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
            timeCount={timeCount}
            setTimeCount={setTimeCount}
            stopsList={stopsList}
            setStopsList={setStopsList}
            WinMessage={WinMessage}
          />
        }
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="/second-mode" element={<SecondMode />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
