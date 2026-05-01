import ChangeStop from "./ChangeStop";

export default function CurrentStopContainer({ currentStop }) {
    return (
        <div className="flex w-full flex-col border-2 border-red-500 rounded-xl text-white p-2 pl-3 max-h-17.5 overflow-auto">
            <div className="flex w-full items-center">
                <div className="flex items-center justify-between w-full text-lg gap-3">

                    {currentStop ? (
                        <div className="flex flex-col ">
                            <span className="text-sm opacity-80">Bieżący przystanek:</span>
                            <span className="font-bold">
                                {currentStop.stopName} {currentStop.stopCode || '-'}
                            </span>
                        </div>
                    ) : (
                        <span>Brak aktualnego przystanku</span>
                    )}

                    {/* ten przycisk nic nie robi trzeba dodać logikę */}
                    <button className="bg-orange-500 hover:bg-orange-600 transition-colors px-4 py-2 border border-orange-600 rounded-2xl whitespace-nowrap">
                        zmień
                    </button>

                </div>

            </div>
            <ChangeStop currentStop={currentStop} />
        </div>
    );
}