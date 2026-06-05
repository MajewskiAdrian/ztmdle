import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-center p-6 sm:p-12 selection:bg-red selection:text-white">
      
      <div className="max-w-3xl text-center mb-16">
        <h1 className="text-6xl sm:text-7xl font-bebas mb-2">
          WITAJ W ZTM<span className="text-red">DLE</span>
        </h1>
        <p className="font-share text-s tracking-[0.2em] text-muted">
          WYBIERZ TRYB GRY I ROZPOCZNIJ ROZGRYWKĘ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        
        <Link
          to="/freeplay"
          className="group relative flex flex-col justify-between border border-panel2 bg-panel p-10 h-[30rem] transition-all duration-200 hover:border-red hover:-translate-y-1.5 rounded-sm overflow-hidden"
        >
          <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-red opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-red opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>          
          
          <div>
            <span className="font-share text-xs tracking-[2px] text-red font-bold block mb-1">
              [ TRYB_01 ]
            </span>
            <h2 className="font-bebas text-5xl tracking-wide mt-2 group-hover:text-red transition-colors duration-200">
              FREEPLAY
            </h2>
            <p className="font-share text-base text-muted leading-relaxed mt-5 pt-4 border-t border-panel2">
              System losuje dla Ciebie przystanek startowy oraz cel podróży. Przemieszczaj się po sieci ZTM Gdańsk, przesiadaj na węzłach i optymalizuj trasę. Zegar tyka, im szybciej dotrzesz na miejsce, tym więcej punktów zdobędziesz!
            </p>
          </div>
          
          <div className="font-share text-s tracking-widest text-text font-bold flex items-center gap-2 pt-4 mt-auto border-t border-panel2">
            GRAJ <span className="text-red group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </div>
        </Link>

        <Link
          to="/geoguessr"
          className="group relative flex flex-col justify-between border border-panel2 bg-panel p-10 h-[30rem] transition-all duration-200 hover:border-amber hover:-translate-y-1.5 rounded-sm overflow-hidden"
        >
          <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-amber opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-amber opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>          
          
          <div>
            <span className="font-share text-xs tracking-[2px] text-amber font-bold block mb-1">
              [ TRYB_02 ]
            </span>
            <h2 className="font-bebas text-5xl tracking-wide mt-2 group-hover:text-amber transition-colors duration-200">
              GEOGUESSR ZTM
            </h2>
            <p className="font-share text-base text-muted leading-relaxed mt-5 pt-4 border-t border-panel2">
              Tu coś sięogarnie
            </p>
          </div>
          
          <div className="font-share text-s tracking-widest text-text font-bold flex items-center gap-2 pt-4 mt-auto border-t border-panel2">
            GRAJ <span className="text-amber group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </div>
        </Link>

      </div>
    </div>
  )
}