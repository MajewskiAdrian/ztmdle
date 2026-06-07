import { useState, useEffect, useRef } from 'react'
import './index.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import FreePlay from './pages/FreePlay.jsx'
import SecondMode from './pages/SecondMode.jsx'
import Profile from './pages/Profile.jsx'
import Achievments from './pages/Achievments.jsx'
import { useGameWinLogic } from './hooks/useGameWinLogic.jsx'

const COOKIE_NAME = 'ztmdleGame'
const ACHIEVEMENT_COOKIE_NAME = 'ztmdleAchievements'

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

function readAchievements() {
  const raw = getCookie(ACHIEVEMENT_COOKIE_NAME)
  if (!raw) return []
  try {
    return JSON.parse(decodeURIComponent(raw))
  } catch {
    return []
  }
}

function saveAchievements(achievements) {
  setCookie(ACHIEVEMENT_COOKIE_NAME, JSON.stringify(achievements), 60)
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
  const [achievements, setAchievements] = useState(readAchievements())
  const [achievementPopup, setAchievementPopup] = useState(null)
  const [showWinMessage, setShowWinMessage, WinMessage] = useGameWinLogic(currentStop, Koncowy, routeCount, timeCount, clearGameCookie)
  const [stopsList, setStopsList] = useState([])
  const skipSaveRef = useRef(false)

  const unlockAchievement = (achievement) => {
    setAchievements((prev) => [...prev, achievement])
    setAchievementPopup(achievement)
  }

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

  useEffect(() => {
    if (skipSaveRef.current) {
      skipSaveRef.current = false
      return
    }
    saveAchievements(achievements)
  }, [achievements])

  useEffect(() => {
    if (!achievementPopup) return

    const timeout = setTimeout(() => {
      setAchievementPopup(null)
    }, 5000)
    return () => clearTimeout(timeout)
  }, [achievementPopup])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    if (achievementPopup) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = previousOverflow
    }
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [achievementPopup])

  useEffect(() => {
    const stopName = currentStop?.stopName?.toLowerCase() || ''
    if (!stopName.includes('swojska')) return

    const alreadyUnlocked = achievements.some((achievement) => achievement.id === 1)
    if (alreadyUnlocked) return

    unlockAchievement({
      id: 1,
      title: 'Ah ****, Here we go again',
      description: 'Dojechałeś do szkoły. Robota czeka.',
    })
  }, [currentStop, achievements])

  useEffect(() => {
    const alreadyUnlocked = achievements.some((achievement) => achievement.id === 2)
    if (alreadyUnlocked) return
    if (timeCount < 120) return

    unlockAchievement({
      id: 2,
      title: 'Podróżnik',
      description: 'Daleka podróż za tobą.',
    })
  }, [timeCount, achievements])

  useEffect(() => {
    const stopName = currentStop?.stopName?.toLowerCase() || ''
    if (!stopName.includes('port lotniczy')) return

    const alreadyUnlocked = achievements.some((achievement) => achievement.id === 3)
    if (alreadyUnlocked) return

    unlockAchievement({
      id: 3,
      title: 'To już nie Ztm',
      description: 'Samolotów nie obsługujemy.',
    })
  }, [currentStop, achievements])

  useEffect(() => {
    const handleTestAchievement = () => {
      document.cookie = `${ACHIEVEMENT_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`
      skipSaveRef.current = true
      setAchievements([])

      const achievement = {
        id: 1,
        title: 'Ah ****, Here we go again',
        description: 'Dojechałeś do szkoły. Robota czeka.',
      }

      const alreadyUnlocked = achievements.some((a) => a.id === 1)
      if (!alreadyUnlocked) {
        setAchievements((prev) => [...prev, achievement])
      }
      setAchievementPopup(achievement)
    }

    window.addEventListener('test-achievement', handleTestAchievement)
    return () => window.removeEventListener('test-achievement', handleTestAchievement)
  }, [achievements])

  return (
    <>
      {achievementPopup && (
  <>
    <div className="fixed inset-0 bg-bg/80 animate-fade-in" style={{ zIndex: 1111 }}></div>
        <div 
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-panel p-8 text-center border-2 border-amber rounded-sm animate-pop-in"
      style={{ zIndex: 1112 }}
    >
      <p className="font-share text-xsm tracking-[0.3em] text-amber mb-4">
        OSIĄGNIĘCIE ODBLOKOWANE!
      </p>
      
      <h2 className="font-bebas text-4xl text-text tracking-wide uppercase mb-3">
        {achievementPopup.title}
      </h2>
      
      <div className="bg-panel2/60 border border-amber/30 p-5 mb-6 rounded-sm">
        <p className="font-share text-base text-text">
          {achievementPopup.description}
        </p>
      </div>

      <button
        onClick={() => setAchievementPopup(null)}
        className="w-full bg-amber hover:bg-amber2 text-bg font-bebas text-2xl py-3 tracking-widest flex items-center justify-center cursor-pointer rounded-sm"
      >
        ZAMKNIJ
      </button>
    </div>
  </>
)}

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
        <Route path="/achievements" element={<Achievments />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
