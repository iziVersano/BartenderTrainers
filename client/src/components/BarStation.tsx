import CocktailDisplay from './CocktailDisplay';
import BackBar from './BackBar';
import FrontBar from './FrontBar';

export default function BarStation() {
  return (
    <div className="w-3/5 bg-gray-50 p-6">
      <CocktailDisplay />
      
      <div className="space-y-6">
        <BackBar />
        
        {/* Floor Space */}
        <div className="h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-sm flex items-center justify-center">
          <span className="text-xs text-gray-600 font-medium">BARTENDER POSITION</span>
        </div>
        
        <FrontBar />
      </div>
    </div>
  );
}
