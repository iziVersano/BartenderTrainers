import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleDualMode } from '@/store/gameSlice';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Layout } from 'lucide-react';
import CocktailDisplay from './CocktailDisplay';
import DualCocktailDisplay from './DualCocktailDisplay';
import BuildArea from './BuildArea';

export default function MobileBuildArea() {
  const dispatch = useDispatch();
  const { isDualMode } = useSelector((state: RootState) => state.game);

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      {/* Header with Dual Mode Toggle */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Build Area</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Dual Mode</span>
          <Switch
            checked={isDualMode}
            onCheckedChange={() => dispatch(toggleDualMode())}
          />
          <Layout className="w-4 h-4 text-gray-600" />
        </div>
      </div>

      {/* Build Area Content */}
      <div className="flex-1 overflow-y-auto">
        {isDualMode ? (
          <div className="space-y-4">
            <DualCocktailDisplay 
              cocktailType="A" 
              title="Cocktail A"
              bgColor="bg-blue-50"
              borderColor="border-blue-200"
              accentColor="bg-blue-500 hover:bg-blue-600"
            />
            <DualCocktailDisplay 
              cocktailType="B" 
              title="Cocktail B"
              bgColor="bg-green-50"
              borderColor="border-green-200"
              accentColor="bg-green-500 hover:bg-green-600"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <CocktailDisplay />
            <BuildArea />
          </div>
        )}
      </div>
    </div>
  );
}