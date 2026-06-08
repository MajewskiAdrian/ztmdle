import { useState, useEffect, useRef } from 'react'
import { getCookie, setCookie } from '../utils/cookieHelpers'

const ACHIEVEMENT_COOKIE_NAME = 'ztmdleAchievements'

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

export function useAchievements(currentStop, timeCount) {
  const [achievements, setAchievements] = useState(readAchievements())
  const [achievementPopup, setAchievementPopup] = useState(null)
  const skipSaveRef = useRef(false)

  const unlockAchievement = (achievement) => {
    setAchievements((prev) => [...prev, achievement])
    setAchievementPopup(achievement)
  }

  // Zapisywanie osiągnięć do ciasteczka przy zmianie stanu
  useEffect(() => {
    if (skipSaveRef.current) {
      skipSaveRef.current = false
      return
    }
    saveAchievements(achievements)
  }, [achievements])

  // Automatyczne zamykanie popupu po 5 sekundach
  useEffect(() => {
    if (!achievementPopup) return

    const timeout = setTimeout(() => {
      setAchievementPopup(null)
    }, 5000)
    return () => clearTimeout(timeout)
  }, [achievementPopup])

  // Blokowanie scrolla body, gdy popup jest otwarty
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

  // Osiągnięcie 1: Swojska
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

  // Osiągnięcie 2: Podróżnik
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

  // Osiągnięcie 3: Port lotniczy
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

  // Obsługa eventu testowego window
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

  return {
    achievementPopup,
    setAchievementPopup,
  }
}