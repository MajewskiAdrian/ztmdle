import { useState } from 'react'
import './index.css'
import Header from './components/Header/Header.jsx';
import MainMap from './components/mainMap/mainMap.jsx';
import AnwserBox from './components/anwserBox/anwserBox.jsx';
import StartEnd from './components/startEnd/startEnd.jsx';
import CurrentStopContainer from './components/CurrentStopContainer.jsx';
import { useGameWinLogic } from './hooks/useGameWinLogic.jsx';
function App() {
  const [poczatkowy, setPoczatkowy] = useState(null);
  const [currentStop, setCurrentStop] = useState(null);
  const [Koncowy, setKoncowy] = useState(null);
  const [routeCount, setRouteCount] = useState(0);
  const [showWinMessage, setShowWinMessage, WinMessage] = useGameWinLogic(currentStop, Koncowy, routeCount);
  const [stopsList, setStopsList] = useState([]);

  return (
    <div className="App min-h-screen h-full overflow-hidden">
      <WinMessage />
      <Header />
      <div className="flex flex-col md:flex-row h-screen w-full min-h-0 overflow-hidden bg-bg items-stretch">

        <aside className="flex flex-col flex-none md:w-96 w-full h-auto md:h-full gap-4 overflow-y-auto border-t md:border-t-0 md:border-l border-border bg-panel min-h-0">
          <StartEnd
            onStartSet={setPoczatkowy}
            currentStop={currentStop}
            onCurrentStopSet={setCurrentStop}
            Koncowy={Koncowy}
            setKoncowy={setKoncowy}
          />
          <CurrentStopContainer currentStop={currentStop} setCurrentStop={setCurrentStop} />
          <AnwserBox startStop={currentStop} onSetCurrentStop={setCurrentStop} routeCount={routeCount} setRouteCount={setRouteCount} stopsList={stopsList} setStopsList={setStopsList} />

        </aside>

        <main className="flex-1 min-w-0 h-auto md:h-full min-h-0 relative">
          <MainMap currentStop={currentStop} startStop={poczatkowy} endStop={Koncowy} stopsList={stopsList} />
        </main>
      </div>

      <button onClick={() => setCurrentStop(Koncowy)}>Test: Set to End Stop</button>

    </div>
  )
}

export default App
