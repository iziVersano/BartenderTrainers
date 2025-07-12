import BackBar from './BackBar';
import FrontBar from './FrontBar';
import MobileBarStation from './MobileBarStation';

export default function BarStation() {
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:block w-full bg-gray-50 p-4 lg:p-6">
        <div className="space-y-4 lg:space-y-6">
          <BackBar />
          
          {/* Floor Space */}
          <div className="h-6 lg:h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-sm flex items-center justify-center">
            <span className="text-xs text-gray-600 font-medium">BARTENDER POSITION</span>
          </div>
          
          <FrontBar />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden w-full h-full">
        <MobileBarStation />
      </div>
    </>
  );
}
