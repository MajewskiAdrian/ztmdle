import { useState, useEffect } from 'react'
import './index.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import FreePlay from './pages/FreePlay.jsx'
import SecondMode from './pages/SecondMode.jsx'
import Profile from './pages/Profile.jsx'
import Achievments from './pages/Achievments.jsx'
import AchievementPopup from './components/AchievementPopup.jsx'
import { useGameWinLogic } from './hooks/useGameWinLogic.jsx'
import { useAchievements } from './hooks/useAchievements.jsx'
import { getCookie, setCookie } from './utils/cookieHelpers'

const COOKIE_NAME = 'ztmdleGame'
//komponent zarządzający stanem gry, trasami, czasem, historią ruchów oraz integrujący logikę wygranej i osiągnięć.
//zapis i odczyt ciasteczek
function readSavedGame() {
  const raw = getCookie(COOKIE_NAME)
  if (!raw) return null
  try {
    return JSON.parse(decodeURIComponent(raw))
  } catch {
    return null
  }
}
//kompnent czysczacy ciasteczka.
function clearGameCookie() {
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`
}
//Wszystkie potrzebne stany gry.
function App() {
  const savedGame = readSavedGame()
  const [poczatkowy, setPoczatkowy] = useState(savedGame?.poczatkowy ?? null)
  const [currentStop, setCurrentStop] = useState(savedGame?.currentStop ?? null)
  const [Koncowy, setKoncowy] = useState(savedGame?.Koncowy ?? null)
  const [routeCount, setRouteCount] = useState(savedGame?.routeCount ?? 0)
  const [timeCount, setTimeCount] = useState(savedGame?.timeCount ?? 0)
  const [moveHistory, setMoveHistory] = useState(savedGame?.moveHistory ?? [])
  const [historyModalOpen, setHistoryModalOpen] = useState(false)
  const [stopsList, setStopsList] = useState([])

  const [showWinMessage, setShowWinMessage, WinMessage] = useGameWinLogic(currentStop, Koncowy, routeCount, timeCount, clearGameCookie)
  
  // hook obsługujący kompletną logikę osiągnięć
  const { achievementPopup, setAchievementPopup } = useAchievements(currentStop, timeCount)
// Funkcje do obsługi historii ruchów, cofania i skakania do konkretnego kroku w historii.
  const applyHistoryState = (nextHistory) => {
    const lastMove = nextHistory[nextHistory.length - 1] || null
    setMoveHistory(nextHistory)
    setRouteCount(nextHistory.length)
    setTimeCount(nextHistory.reduce((total, move) => total + move.deltaTime, 0))
    setCurrentStop(lastMove ? lastMove.toStop : poczatkowy ?? null)
  }
// Funkcja do zatwierdzania ruchu, aktualizująca aktualny przystanek, licznik tras, czas oraz historię ruchów.
  const handleCommitMove = ({ fromStop, toStop, routeId, tripId, routeLabel, deltaTime }) => {
    setCurrentStop(toStop)
    setRouteCount((prevCount) => prevCount + 1)
    setTimeCount((prevTime) => prevTime + deltaTime)
    setMoveHistory((prevHistory) => [
      ...prevHistory,
      {
        step: prevHistory.length + 1,
        fromStop,
        toStop,
        routeId,
        tripId,
        routeLabel,
        deltaTime,
      },
    ])
  }

  const handleUndoLastMove = () => {
    const nextHistory = moveHistory.slice(0, -1)
    applyHistoryState(nextHistory)
  }

  const handleJumpToHistoryStep = (stepIndex) => {
    const nextHistory = moveHistory.slice(0, stepIndex)
    applyHistoryState(nextHistory)
  }

  useEffect(() => {
    const gameData = {
      poczatkowy,
      currentStop,
      Koncowy,
      routeCount,
      timeCount,
      moveHistory,
    }
    setCookie(COOKIE_NAME, JSON.stringify(gameData), 30)
  }, [poczatkowy, currentStop, Koncowy, routeCount, timeCount, moveHistory])

  return (
    <>
      <AchievementPopup 
        popupData={achievementPopup} 
        onClose={() => setAchievementPopup(null)} 
      />

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
              moveHistory={moveHistory}
              historyModalOpen={historyModalOpen}
              setHistoryModalOpen={setHistoryModalOpen}
              onUndoLastMove={handleUndoLastMove}
              onJumpToHistoryStep={handleJumpToHistoryStep}
              onCommitMove={handleCommitMove}
              stopsList={stopsList}
              setStopsList={setStopsList}
              WinMessage={WinMessage}
            />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/second-mode" element={<SecondMode />} />
        <Route path="/achievements" element={<Achievments />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App