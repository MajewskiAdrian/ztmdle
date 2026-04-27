import { useState } from "react";
import ChangeStop from "./ChangeStop";

export default function CurrentStopContainer({ currentStop }) {
  const [showChanges, setShowChanges] = useState(false);

  return (
    <div className="flex w-full flex-col  px-4">
      <div className="flex items-center gap-4 px-2 py-3">
          <span className="font-share text-[12px] tracking-[0.4em] text-muted">
              JESTEŚ TUTAJ
          </span>
          <div className="h-0.5 flex-1 bg-panel2"></div>
      </div>
      <div className="relative flex w-full items-center justify-between bg-panel2 border border-muted2 border-l-4 border-l-amber p-4">          
          <div className="flex flex-col">
            <span className="font-share text-[10px] tracking-widest text-muted">
              AKTUALNY PRZYSTANEK
            </span>
            <span className="font-bebas text-2xl tracking-wide text-amber uppercase leading-none mt-1">
              {currentStop ? currentStop.stopName : "Wybierz przystanek"}
              <span className="ml-2">{currentStop?.stopCode}</span>
            </span>
        </div>

        <button 
          onClick={() => setShowChanges(!showChanges)}
          className="bg-amber hover:bg-amber2 text-bg font-bebas text-lg px-5 py-1 rounded-sm "
        >
          {showChanges ? 'Cofnij' : 'Zmień'}
        </button>
      </div>

      {showChanges && (
          <ChangeStop currentStop={currentStop} visible={showChanges} />
      )}
    </div>
  );
}