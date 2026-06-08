import { useState } from 'react'
// Komponent do histori tras i cofania.
export default function RouteHistoryModal({ open, moveHistory, onClose, onJumpToStep }) {
  const [pendingStep, setPendingStep] = useState(null)

  if (!open) return null

  const closePending = () => setPendingStep(null)

  const confirmJump = () => {
    if (pendingStep == null) return
    onJumpToStep(pendingStep.index)
    setPendingStep(null)
  }

  return (
    <div className="fixed inset-0 z-1200 flex items-end justify-center bg-bg/85 p-3 sm:items-center sm:p-6">
      <div className="w-full max-w-xl overflow-hidden rounded-sm border border-border bg-panel text-text shadow-2xl shadow-black/60">
        <div className="flex items-center justify-between gap-4 border-b border-border p-4 sm:p-5">
          <div>
            <h2 className="font-bebas text-4xl tracking-wide text-amber">Historia trasy</h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-sm border border-border2 bg-panel2 px-4 py-2 font-bebas text-lg tracking-widest text-text transition-colors hover:bg-white/5"
          >
            ZAMKNIJ
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
          {moveHistory.length === 0 ? (
            <div className="rounded-sm border border-border2 bg-panel2 p-5 text-center">
              <p className="font-share text-sm tracking-[0.25em] text-muted">BRAK HISTORII</p>
              <p className="mt-2 font-bebas text-3xl text-text">Zatwierdź pierwszy przejazd, żeby zobaczyć przebieg.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {moveHistory.map((move, index) => {
                const isLast = index === moveHistory.length - 1

                return (
                  <button
                    key={`${move.routeId}-${move.tripId}-${index}`}
                    onClick={() => setPendingStep({ index, move })}
                    className={`group relative w-full rounded-sm border p-4 text-left transition-colors ${
                      isLast
                        ? 'border-amber bg-amber2/10'
                        : 'border-border2 bg-panel2 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="font-share text-[10px] tracking-[0.35em] text-muted">KROK {index + 1}</p>
                            <p className="mt-1 font-bebas text-2xl tracking-wide text-text">{move.routeLabel}</p>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm leading-snug text-text/85">
                          <span className="rounded-full border border-border2 bg-bg px-3 py-1 font-medium tracking-normal">{move.fromStop?.stopName || 'Start'}</span>
                          <span className="text-muted"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg></span>
                          <span className="rounded-full border border-border2 bg-bg px-3 py-1 font-medium tracking-normal">{move.toStop?.stopName || 'Cel'}</span>
                        </div>

                          <div className="rounded-sm border border-border2 bg-bg px-3 py-2 text-right">
                            <p className="font-share text-[9px] tracking-[0.35em] text-muted">+CZAS</p>
                            <p className="font-bebas text-3xl leading-none text-amber">{move.deltaTime} min</p>
                          </div>
                        </div>

                        
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {pendingStep && (
          <div className="absolute inset-0 z-1300 flex items-center justify-center bg-bg/75 p-4">
            <div className="animate-modal-pop-soft w-full max-w-md rounded-sm border border-border bg-panel p-5 text-center shadow-2xl shadow-black/70">
              <p className="font-share text-[11px] tracking-[0.35em] text-muted">POTWIERDZENIE</p>
              <h3 className="mt-2 font-bebas text-4xl tracking-wide text-amber"> {pendingStep.index === 0 ? "Usunąć wszystkie ruchy?" : `Wrócić do ${pendingStep.index} ruchu?`}</h3>
              <p className="mt-3 text-sm leading-snug text-text/80">
                Wrócisz do <span className="font-medium text-text">{pendingStep.move.fromStop?.stopName || 'startu'}</span> i usuniesz późniejsze ruchy z historii.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  onClick={closePending}
                  className="rounded-sm border border-border2 bg-panel2 px-4 py-3 font-bebas text-lg tracking-widest text-text transition-colors hover:bg-white/5"
                >
                  ANULUJ
                </button>
                <button
                  onClick={confirmJump}
                  className="rounded-sm bg-amber px-4 py-3 font-bebas text-lg tracking-widest text-bg transition-colors hover:bg-amber2"
                >
                  WRÓĆ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}