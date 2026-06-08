import Header from '../components/Header/Header.jsx';
import MainMap from '../components/mainMap/mainMap.jsx';
import AnwserBox from '../components/anwserBox/anwserBox.jsx';
import StartEnd from '../components/startEnd/startEnd.jsx';
import CurrentStopContainer from '../components/CurrentStopContainer.jsx';
import { useEffect } from 'react';

export default function FreePlay({
  poczatkowy,
  setPoczatkowy,
  currentStop,
  setCurrentStop,
  Koncowy,
  setKoncowy,
  timeCount,
  moveHistory,
  historyModalOpen,
  setHistoryModalOpen,
  onUndoLastMove,
  onJumpToHistoryStep,
  onCommitMove,
  stopsList,
  setStopsList,
  WinMessage,
}) {
  useEffect(() => {
    setStopsList([])
  }, [currentStop, setStopsList])

  return (
    <>
    <Header />
    <div className="App h-[calc(100vh-4rem)] w-full overflow-hidden relative bg-bg">
      <WinMessage />
      <div className="flex flex-col md:flex-row h-full w-full min-h-0 overflow-hidden bg-bg items-stretch">
        <aside className="flex flex-col flex-none md:w-120 w-full h-auto md:h-full gap-4 overflow-y-auto border-t md:border-t-0 md:border-l border-border bg-panel min-h-0">
          <StartEnd
            poczatkowy={poczatkowy}
            onStartSet={setPoczatkowy}
            currentStop={currentStop}
            onCurrentStopSet={setCurrentStop}
            Koncowy={Koncowy}
            setKoncowy={setKoncowy}
          />
          <CurrentStopContainer currentStop={currentStop} setCurrentStop={setCurrentStop} />
          <AnwserBox
            startStop={currentStop}
            onSetCurrentStop={setCurrentStop}
            onCommitMove={onCommitMove}
            stopsList={stopsList}
            setStopsList={setStopsList}
          />
        </aside>

        <main className="flex-1 min-w-0 h-auto md:h-full min-h-0 relative">
          <MainMap
            currentStop={currentStop}
            startStop={poczatkowy}
            endStop={Koncowy}
            stopsList={stopsList}
            timeCount={timeCount}
            moveHistory={moveHistory}
            historyModalOpen={historyModalOpen}
            onOpenHistory={() => setHistoryModalOpen(true)}
            onCloseHistory={() => setHistoryModalOpen(false)}
            onUndoLastMove={onUndoLastMove}
            onJumpToHistoryStep={onJumpToHistoryStep}
          />
        </main>
      </div>

      <button onClick={() => setCurrentStop(Koncowy)}>Test: Set to End Stop</button>
    </div>
    </>
  );
}
