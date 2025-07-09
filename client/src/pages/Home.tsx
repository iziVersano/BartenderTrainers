import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentCocktail } from '@/store/gameSlice';
import { getRandomCocktail } from '@/data/cocktails';
import BarStation from '@/components/BarStation';
import BuildArea from '@/components/BuildArea';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load a random cocktail on mount
    const cocktail = getRandomCocktail();
    dispatch(setCurrentCocktail(cocktail));
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
      <main className="flex-1 flex flex-col lg:flex-row h-full">
        {/* LEFT: Bar Station Area */}
        <div className="w-full lg:w-3/4 p-4 overflow-y-auto">
          <BarStation />
        </div>

        {/* RIGHT: Cocktail & Build Area */}
        <div className="w-full lg:w-1/4 p-4 overflow-y-auto bg-white border-t lg:border-t-0 lg:border-l border-gray-200">
          <BuildArea />
        </div>
      </main>
    </div>
  );
}
