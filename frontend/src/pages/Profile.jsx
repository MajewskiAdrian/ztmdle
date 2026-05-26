import { Link } from 'react-router-dom'

export default function Profile() {
  return (
    <div className="min-h-screen bg-bg text-text p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Profil</h1>
        <p className="mt-2 text-muted">To jest strona profilu użytkownika.</p>
      </header>
      <main className="space-y-4">
        <section className="rounded-xl border border-border bg-panel p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Informacje o profilu</h2>
          <p className="mt-3 text-sm text-muted">
            Tutaj możesz dodać informacje o użytkowniku, ustawienia lub inne dane profilu.
          </p>
        </section>

        <Link
          to="/"
          className="inline-block rounded-md bg-red px-4 py-2 text-white hover:bg-red/90"
        >
          Wróć do Home
        </Link>
      </main>
    </div>
  )
}
