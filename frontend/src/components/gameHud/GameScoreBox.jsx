export default function GameScoreBox({ timeCount }) {
  return (
    <div className="min-w-20 rounded-sm border border-border bg-panel/92 p-1.5 text-text shadow-lg shadow-black/30 backdrop-blur sm:w-40">
      <p className="font-share text-[9px] tracking-[0.35em] text-muted">CZAS</p>
      
        <span key={timeCount} className="block font-bebas text-3xl leading-none text-amber animate-time-roll">
          {timeCount} MIN
        </span>
    </div>
  )
}