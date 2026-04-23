import { useState } from 'react'
import './index.css'
import Header from './components/Header/Header.jsx';
import MainMap from './components/mainMap/mainMap.jsx';
import AnwserBox from './components/anwserBox/anwserBox.jsx';
import StartEnd from './components/startEnd/startEnd.jsx';
import { useGameWinLogic } from './hooks/useGameWinLogic.jsx';
function App() {
  const [poczatkowy, setPoczatkowy] = useState(null);
  const [currentStop, setCurrentStop] = useState(null);
  const [Koncowy, setKoncowy] = useState(null);
  const [routeCount, setRouteCount] = useState(0);
  const [showWinMessage, setShowWinMessage, WinMessage] = useGameWinLogic(currentStop, Koncowy, routeCount);

  return (
    <div className="App">
      <WinMessage />
      <Header />
      <StartEnd
        onStartSet={setPoczatkowy}
        currentStop={currentStop}
        onCurrentStopSet={setCurrentStop}
        Koncowy={Koncowy} setKoncowy={setKoncowy}
      />
      <MainMap currentStop={currentStop} setCurrentStop={setCurrentStop} endStop={Koncowy} setEndStop={setKoncowy}/>
      <AnwserBox startStop={currentStop} onSetCurrentStop={setCurrentStop} routeCount={routeCount} setRouteCount={setRouteCount}/>
      {

        //Guzik do wypierdolenia ale narazie jest bo przystanki nie dzialaja
      }
      <button onClick={() => setCurrentStop(Koncowy)}>Test: Set to End Stop</button>
    </div>
  )
}

export default App
