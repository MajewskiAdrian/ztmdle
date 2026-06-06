export default function GameSidebar({ currentStop, distance, isSubmitted, markerPos, currentRound, totalDistance, onCheckGuess, onNextRound, formatDistance }) {
  return (
    <aside className="flex flex-col md:w-120 w-full h-auto md:h-full gap-4 border-t md:border-t-0 md:border-l border-border bg-panel justify-between">
      <div className="flex flex-col gap-4 w-full">
        
        <div className="flex justify-between px-4 pt-4 font-share text-xs tracking-widest text-text">
          <span>RUNDA {currentRound} / 5</span>
          <span>SUMA: {formatDistance(totalDistance)}</span>
        </div>

        <div className="w-full py-8 bg-panel2 border-y border-muted2 p-4">
          <div className="flex flex-col">
            <span className="font-share text-xsm tracking-widest text-red pb-1.5">
              ZNAJDZ PRZYSTANEK
            </span>
            <span className="font-bebas text-5xl tracking-wide text-text uppercase">
              {currentStop ? currentStop.stopName : "Ładowanie..."}
            </span>
          </div>
        </div>

        {distance !== null && (
          <div className="mx-4 p-4 bg-panel2 border border-border rounded-sm">
            <span className="font-share text-xsm tracking-widest text-text block pb-1">
              TWOJA ODLEGLOSC W TEJ RUNDZIE
            </span>
            <span className="font-bebas text-4xl tracking-wider text-red">
              {formatDistance(distance)}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-muted2 bg-panel2/40 w-full">
        {!isSubmitted ? (
          <button 
            onClick={onCheckGuess} 
            disabled={!markerPos}
            className={`w-full text-text font-bebas text-2xl tracking-widest py-3.5 text-center cursor-pointer transition-colors ${
              markerPos ? 'bg-red hover:bg-red/90' : 'bg-muted/40 text-text/40'
            }`}
          >
            ZATWIERDŹ
          </button>
        ) : (
          <button 
            onClick={onNextRound} 
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-text font-bebas text-2xl tracking-widest py-3.5 text-center cursor-pointer"
          >
            {currentRound === 5 ? 'ZOBACZ PODSUMOWANIE' : 'DALEJ'}
          </button>
        )}
      </div>
    </aside>
  );
}