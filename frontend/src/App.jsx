import { useState } from 'react'
import './index.css'
import Header from './components/Header/Header.jsx';
import MainMap from './components/mainMap/mainMap.jsx';
import AnwserBox from './components/anwserBox/anwserBox.jsx';
import StartEnd from './components/startEnd/startEnd.jsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header />
      <StartEnd />
      <MainMap />
      <AnwserBox />
    </div>
  )
}

export default App
