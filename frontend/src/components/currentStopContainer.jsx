export default function CurrentStopContainer({ currentStop }) {
    return (
        <div className="flex w-full border-2 border-red-500 rounded-xl text-white p-2 items-center">
            {/* Główny kontener z flexem i justify-between */}
            <div className="flex items-center justify-between w-full text-lg gap-3">
             
                {currentStop ? (
                    <div className="flex flex-col">
                        <span className="text-sm opacity-80">Bieżący przystanek:</span>
                        <span className="font-bold">
                            {currentStop.stopName} {currentStop.stopCode || '-'}
                        </span>
                    </div>
                ) : (
                    <span>Brak aktualnego przystanku</span>
                )}
                
                <button className="bg-orange-500 hover:bg-orange-600 transition-colors px-4 py-2 border border-orange-600 rounded-2xl whitespace-nowrap">
                    zmień
                </button>
                
            </div>
        </div>
    );
}