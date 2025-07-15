import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeTrainingSequence } from '@/store/gameSlice';
import { shuffleCocktails } from '@/data/cocktails';
import BarStation from '@/components/BarStation';
import BuildArea from '@/components/BuildArea';
import MobileBuildArea from '@/components/MobileBuildArea';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize training sequence with shuffled cocktails
    const shuffledCocktails = shuffleCocktails();
    dispatch(initializeTrainingSequence(shuffledCocktails));
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl">🍸</div>
            <h1 className="text-2xl font-semibold text-gray-800">Bar Station Trainer</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Training Mode</span>
            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
              <span className="text-sm text-white">👤</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full">
        {/* Desktop Layout */}
        <div className="hidden md:flex flex-1 flex-row h-full">
          {/* LEFT: Bar Station Area */}
          <div className="w-3/4 p-4 overflow-y-auto">
            <BarStation />
          </div>

          {/* RIGHT: Cocktail & Build Area */}
          <div className="w-1/4 p-4 overflow-y-auto bg-white border-l border-gray-200">
            <BuildArea />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-1 flex-col h-full">
          {/* TOP: Build Area */}
          <div className="h-1/2 bg-white border-b border-gray-200 overflow-y-auto">
            <MobileBuildArea />
          </div>

          {/* BOTTOM: Bar Station with Tabs */}
          <div className="h-1/2 flex flex-col">
            <BarStation />
          </div>
        </div>
      </main>
    </div>
  );
}
