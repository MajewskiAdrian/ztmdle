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
        <div className="overlay"></div>
        <div className="win-message">
          Gratulacje, wygrałeś!
          <p>Liczba przesiadek: {routeCount}</p>
          <button className="close-btn" onClick={() => setShowWinMessage(false)}>X</button>
        </div>
      </>
    )
  );

  return [showWinMessage, setShowWinMessage, WinMessage];
};
