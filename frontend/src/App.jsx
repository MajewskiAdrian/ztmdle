import { useState } from 'react'
import './index.css'
import Header from './components/Header/Header.jsx';
import MainMap from './components/mainMap/mainMap.jsx';
import AnwserBox from './components/anwserBox/anwserBox.jsx';
import StartEnd from './components/startEnd/startEnd.jsx';
function App() {
  const [poczatkowy, setPoczatkowy] = useState(null)
  const [currentStop, setCurrentStop] = useState(null)

  return (
    <div className="App">
      <Header />
      <StartEnd
        onStartSet={setPoczatkowy}
        currentStop={currentStop}
        onCurrentStopSet={setCurrentStop}
      />
      <MainMap />
      <AnwserBox startStop={currentStop} onSetCurrentStop={setCurrentStop} />
    </div>
  )
}

export default App
