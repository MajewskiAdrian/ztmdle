import { useEffect, useState } from 'react';

export const useGameWinLogic = (currentStop, endStop, routeCount) => {
  const [showWinMessage, setShowWinMessage] = useState(false);

  useEffect(() => {
    if (currentStop && endStop && currentStop.stopId === endStop.stopId) {
      setShowWinMessage(true);
    }
  }, [currentStop, endStop]);

  const WinMessage = () => (
    showWinMessage && (
      <>
        <div className="fixed inset-0 bg-bg/80 z-1000 animate-fade-in"></div>
        
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-panel p-8 z-1001 rounded-sm text-center">
          
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-red"></div>

          <h1 className="font-bebas text-6xl text-text mb-5">
            DO DOTARŁEŚ DO CELU!
          </h1>
          
            <div className="flex flex-col items-center justify-center bg-panel2/50 border border-muted2/30 p-6">
              <span className="font-bebas text-5xl text-amber">{routeCount}</span>
              <span className="font-share text-sm tracking-[0.4em] text-muted whitespace-nowrap">
                LICZBA PRZYSTANKÓW
              </span>
            </div>
            
          <button 
            className="w-full bg-red hover:bg-red2 text-text font-bebas text-2xl py-5 mt-5 transition-all tracking-widest flex items-center justify-center" onClick={() => { window.location.reload(); }}>
            ZAGRAJ PONOWNIE
          </button>
        </div>
      </>
    )
  );

  return [showWinMessage, setShowWinMessage, WinMessage];
};