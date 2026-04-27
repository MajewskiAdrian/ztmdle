export default function Header() {
  return (
    <header className="flex h-16 w-full items-center border-b border-red bg-panel px-4 md:px-8 shadow-2xl">
      
      <div className="flex items-center gap-3">
        <a href="/" className="flex items-center no-underline">
          <div className="font-bebas text-2xl md:text-3xl tracking-wider leading-none">
            <span className="text-red">ZTM</span>
            <span className="text-text ml-0.5">DLE</span>
          </div>    
        </a>

        <div className="hidden md:flex items-center border-l border-muted2 pl-4">
          <span className="font-share text-xs tracking-[0.3em] text-muted pt-1">
            GDAŃSK
          </span>
        </div>
      </div>


    </header>
  );
}