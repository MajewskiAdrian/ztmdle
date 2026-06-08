import React from 'react'

export default function AchievementPopup({ popupData, onClose }) {
  if (!popupData) return null

  return (
    <>
      <div className="fixed inset-0 bg-bg/80 animate-fade-in" style={{ zIndex: 1111 }}></div>
      <div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-panel p-8 text-center border-2 border-amber rounded-sm animate-pop-in"
        style={{ zIndex: 1112 }}
      >
        <p className="font-share text-xsm tracking-[0.3em] text-amber mb-4">
          OSIĄGNIĘCIE ODBLOKOWANE!
        </p>
        
        <h2 className="font-bebas text-4xl text-text tracking-wide uppercase mb-3">
          {popupData.title}
        </h2>
        
        <div className="bg-panel2/60 border border-amber/30 p-5 mb-6 rounded-sm">
          <p className="font-share text-base text-text">
            {popupData.description}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-amber hover:bg-amber2 text-bg font-bebas text-2xl py-3 tracking-widest flex items-center justify-center cursor-pointer rounded-sm"
        >
          ZAMKNIJ
        </button>
      </div>
    </>
  )
}