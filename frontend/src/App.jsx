import { useState } from 'react'
import './index.css'
import Header from './components/Header/Header.jsx';
import MainMap from './components/mainMap/mainMap.jsx';
import AnwserBox from './components/anwserBox/anwserBox.jsx';
import StartEnd from './components/startEnd/startEnd.jsx';
import CurrentStopContainer from './components/currentStopContainer.jsx';
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
      <div className="w-full max-w-7xl mx-auto px-5 mt-5">
        <div className="grid grid-cols-[2fr_3fr] gap-5">

          <CurrentStopContainer currentStop={currentStop} />
          <StartEnd
            onStartSet={setPoczatkowy}
            currentStop={currentStop}
            onCurrentStopSet={setCurrentStop}
            Koncowy={Koncowy}
            setKoncowy={setKoncowy}
          />
<AnwserBox startStop={currentStop} onSetCurrentStop={setCurrentStop} routeCount={routeCount} setRouteCount={setRouteCount} />
          <MainMap currentStop={currentStop} startStop={poczatkowy} endStop={Koncowy} />
        </div>

        {/* <div className="flex justify-center m-0 mt-7 gap-5">
          
        </div> */}

        {

          //Guzik do wypierdolenia ale narazie jest bo przystanki nie dzialaja
        }
        <button onClick={() => setCurrentStop(Koncowy)}>Test: Set to End Stop</button>
      </div>
    </div>
  )
}

export default App
