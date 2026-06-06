import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-center gap-6 p-6 sm:p-12 font-sans">
      <div className="max-w-3xl text-center mb-2">
        <h1 className="text-6xl sm:text-7xl font-bebas tracking-wide mb-3 uppercase">
          WYBIERZ TRYB GRY
        </h1>
        <p className="font-share text-base tracking-wider text-muted max-w-xl mx-auto leading-relaxed">
          WYBIERZ TRYB I ROZPOCZNIJ ROZGRYWKE
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        <Link
          to="/freeplay"
          className="group relative flex flex-col justify-between border border-panel2 bg-panel p-10 pt-14 min-h-144 transition-all duration-200 hover:border-red/60 hover:-translate-y-1.5 rounded-sm overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-red"></div>
          <div>
            <span className="font-share text-xs tracking-[2px] text-red font-bold block">
              TRYB KLASYCZNY
            </span>
            <h2 className="font-bebas text-5xl sm:text-6xl tracking-wide mt-1 text-white group-hover:text-red transition-colors duration-200">
              TRAVLE
            </h2>
            <p className="font-share text-base text-muted/80 leading-relaxed mt-5">
              Podróżuj siecią ZTM Gdańsk. Znajdź trasę od A do B. Im szybciej dotrzesz na miejsce, tym więcej punktów zdobywasz.
            </p>
            <ul className="mt-10 space-y-3 font-share text-sm tracking-wide text-muted/60">
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-red"></span> Dostępna lista przystnaków
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-red"></span> Nieograniczona ilość ruchów
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-red"></span> Punkty za szybkość
              </li>
            </ul>
          </div>
          <div className="mt-auto pt-6">
            <div className="flex items-center gap-3 mb-6 font-share text-xs tracking-widest text-muted/40">
              <span>TRUDNOŚĆ</span>
              <div className="h-1 flex-1 bg-panel2/60 relative overflow-hidden rounded-full">
                <div className="absolute top-0 left-0 h-full w-0 bg-red/40 transition-all duration-500 ease-out group-hover:w-1/4 group-hover:bg-red"></div>
              </div>
            </div>
            
            <div className="w-full border-2 border-red bg-transparent text-red font-bebas text-3xl tracking-widest py-3.5 text-center transition-all duration-200 group-hover:bg-red group-hover:text-white">
              ZAGRAJ
            </div>
          </div>
        </Link>

        <Link
          to="/second-mode"
          className="group relative flex flex-col justify-between border border-panel2 bg-panel p-10 pt-14 min-h-144 transition-all duration-200 hover:border-amber/60 hover:-translate-y-1.5 rounded-sm overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-amber"></div>
          
          <div>
            <span className="font-share text-xs tracking-[2px] text-amber font-bold block">
              TRYB LOKALIZACJI
            </span>
            <h2 className="font-bebas text-5xl sm:text-6xl tracking-wide mt-1 text-white group-hover:text-amber transition-colors duration-200">
              GEOZTM
            </h2>
            <p className="font-share text-base text-muted/80 leading-relaxed mt-5">
              Zaznacz na mapie wskazany przez nas przystanek. Im bliżej pinezki, tym więcej punktów zdobywasz.
            </p>
            <ul className="mt-10 space-y-3 font-share text-sm tracking-wide text-muted/60">
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber"></span> Zaznaczanie pinezką
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber"></span> Jeden ruch
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber"></span> Punkty za precyzję
              </li>
            </ul>
          </div>
          <div className="mt-auto pt-6">
            <div className="flex items-center gap-3 mb-6 font-share text-xs tracking-widest text-muted/40">
              <span>TRUDNOŚĆ</span>
              <div className="h-1 flex-1 bg-panel2/60 relative overflow-hidden rounded-full">
                <div className="absolute top-0 left-0 h-full w-0 bg-amber/40 transition-all duration-500 ease-out group-hover:w-2/4 group-hover:bg-amber"></div>
              </div>
            </div>
            
            <div className="w-full border-2 border-amber bg-transparent text-amber font-bebas text-3xl tracking-widest py-3.5 text-center transition-all duration-200 group-hover:bg-amber group-hover:text-black">
              ZAGRAJ
            </div>
          </div>
        </Link>

      </div>

    </div>
  )
}