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
    <div className="min-h-screen bg-bg text-text">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <header className="mb-12 rounded-3xl border border-border bg-panel p-8 shadow-2xl">
          <h1 className="text-4xl font-bold text-center mb-3">Achievements</h1>
          <p className="text-center text-muted">
            Tutaj pojawią się Twoje odblokowane osiągnięcia.
          </p>
        </header>

        <main className="flex flex-col items-center gap-10">
          <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
            {ACHIEVEMENT_DEFINITIONS.map((item) => {
              const unlocked = isUnlocked(item.id)
              return (
                <div
                  key={item.id}
                  className={`h-40 rounded-3xl border p-6 flex flex-col items-center justify-center text-center shadow-lg ${
                    unlocked ? 'border-amber bg-amber/10' : 'border-border bg-surface'
                  }`}
                >
                  <span className="text-xl font-semibold">{item.title}</span>
                  <span className={`text-sm mt-2 ${unlocked ? 'text-text' : 'text-muted'}`}>
                    {unlocked ? item.description : item.lockedText}
                  </span>
                  {!unlocked && (
                    <span className="text-xs uppercase tracking-[0.2em] text-muted mt-3">
                      Odblokuj, aby zobaczyć więcej
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          <div className="max-w-3xl rounded-3xl border border-border bg-panel p-6 text-center shadow-2xl">
            <p className="text-lg font-medium">Sekret</p>
            <p className="mt-3 text-muted">
              Nikt nie wie jak go odblokować. Nawet twórcy.
            </p>
          </div>

          <div className="text-center text-sm text-muted">
            <Link to="/" className="text-red hover:underline">Powrót do startu</Link>
          </div>
        </main>
      </div>
    </div>
  )
}
