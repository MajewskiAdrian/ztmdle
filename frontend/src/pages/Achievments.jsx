import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ACHIEVEMENT_COOKIE_NAME = 'ztmdleAchievements'

function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
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

const ACHIEVEMENT_DEFINITIONS = [
  {
    id: 1,
    title: 'Ah ****, Here we go again',
    description: 'Dojechałeś do szkoły. Robota czeka.',
    lockedText: 'Sekret',
  },
  {
    id: 2,
    title: 'Podróżnik',
    description: 'Daleka podróż za tobą.',
    lockedText: 'Sekret',
  },
  {
    id: 3,
    title: 'To już nie Ztm',
    description: 'Samolotów nie obsługujemy.',
    lockedText: 'Sekret',
  },
]

export default function Achievments() {
  const [achievements, setAchievements] = useState([])

  useEffect(() => {
    setAchievements(readAchievements())
  }, [])

  const isUnlocked = (id) => achievements.some((achievement) => achievement.id === id)

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-center p-6 sm:p-12">
      
      <div className="max-w-3xl text-center mb-16">
        <h1 className="text-6xl sm:text-7xl font-bebas mb-2">
          OSIĄGNIĘCIA
        </h1>
        <p className="font-share text-s tracking-wide text-muted uppercase">
          TUTAJ POJAWIA SIE TWOJE OSIAGNIECIA
        </p>
      </div>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3 mb-10">
        {ACHIEVEMENT_DEFINITIONS.map((item) => {
          const unlocked = isUnlocked(item.id)
          return (
            <div
              key={item.id}
              className={`group relative flex flex-col justify-between border p-8 h-72 rounded-sm overflow-hidden transition-all duration-200 ${
                unlocked 
                  ? 'border-amber bg-panel hover:-translate-y-1' 
                  : 'border-panel2/40 bg-panel/40 opacity-70'
              }`}
            >

              <div>
                <h2 className={`font-bebas text-3xl tracking-wide mt-2 transition-colors duration-200 ${unlocked ? 'group-hover:text-amber' : 'text-muted/40'}`}>
                  {item.title}
                </h2>
                <p className="font-share text-sm text-muted leading-relaxed mt-4 pt-3 border-t border-panel2">
                  {unlocked ? item.description : item.lockedText}
                </p>
              </div>

              <div className={`font-share text-xs tracking-widest font-bold pt-3 mt-auto border-t border-panel2 uppercase ${unlocked ? 'text-text' : 'text-muted/40'}`}>
                {unlocked ? (
                  <span className="text-amber">STATUS: ODBLOKOWANE</span>
                ) : (
                  <span>ZABLOKOWANE</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div className="font-share text-s tracking-widest font-bold flex items-center gap-2 uppercase">
        <Link to="/" className="text-red hover:underline group">
          Powrót do startu
        </Link>
      </div>

    </div>
  )
}