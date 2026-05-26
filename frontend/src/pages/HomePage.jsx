import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-center p-8">
      <div className="max-w-xl text-center">
        <h1 className="text-5xl font-bold mb-4">Witaj w ZTM DLE</h1>
        <p className="text-lg text-muted mb-8">
          To jest czysta strona główna. Aby rozpocząć tryb freeplay, przejdź do podstrony.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/freeplay"
            className="rounded bg-red px-6 py-3 text-white text-sm font-semibold hover:bg-red/90"
          >
            Przejdź do freeplay
          </Link>
          <Link
            to="/second-mode"
            className="rounded border border-border px-6 py-3 text-text text-sm hover:bg-surface"
          >
            Zobacz drugi tryb
          </Link>
        </div>
      </div>
    </div>
  )
}
