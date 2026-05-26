import { Link } from 'react-router-dom';

export default function SecondMode() {
  return (
    <div className="min-h-screen bg-bg text-text p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Second Mode</h1>
        <p className="mt-2 text-muted">To jest osobna strona w aplikacji z routingiem.</p>
      </header>
      <main className="space-y-4">
        <p>Możesz tu dodać dowolną treść, ustawienia, instrukcje lub inne widgety.</p>
        <Link to="/" className="inline-block rounded-md bg-red px-4 py-2 text-white hover:bg-red/90">
          Wróć do HomePage
        </Link>
      </main>
    </div>
  );
}
