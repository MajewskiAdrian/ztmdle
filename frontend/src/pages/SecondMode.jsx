import { Link } from 'react-router-dom';
import Header from '../components/Header/Header.jsx';
import MainMap from '../components/mainMap/mainMap.jsx';
import AnwserBox from '../components/anwserBox/anwserBox.jsx';
import StartEnd from '../components/startEnd/startEnd.jsx';
import CurrentStopContainer from '../components/CurrentStopContainer.jsx';

export default function SecondMode() {
  return (
    <>
    <Header />
   <div className="App h-[calc(100vh-4rem)] w-full overflow-hidden relative bg-bg">
         <div className="flex flex-col md:flex-row h-full w-full min-h-0 overflow-hidden bg-bg items-stretch">
           <aside className="flex flex-col flex-none md:w-96 w-full h-auto md:h-full gap-4 overflow-y-auto border-t md:border-t-0 md:border-l border-border bg-panel min-h-0">
             <p className='text-red'>BOK</p>
           </aside>
   
           <main className="flex-1 min-w-0 h-auto md:h-full min-h-0 relative">
            <p className='text-red'>ŚRODEK</p>
           </main>
         </div>
    </div>
    </>
  );
}
