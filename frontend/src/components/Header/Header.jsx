import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="flex h-16 w-full items-center border-b-3 border-red bg-panel px-4 md:px-8 shadow-2xl">
      
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center no-underline">
          <div className="font-bebas text-2xl md:text-3xl tracking-wider leading-none">
            <span className="text-red">ZTM</span>
            <span className="text-text ml-0.5">DLE</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center border-l border-muted2 pl-4">
          <span className="font-share text-xs tracking-[0.3em] text-muted pt-1">
            GDAŃSK
          </span>
        </div>
      </div>

      <nav className="ml-auto flex gap-3 text-sm">
        <Link to="/achievements" className="rounded px-3 py-2 text-text hover:bg-white/10 cursor-pointer">
          Osiągnięcia
        </Link>
        <Link to="/" className="rounded bg-red px-3 py-2 text-white hover:bg-red/90">
          Start
        </Link>
      </nav>

    </header>
  );
}