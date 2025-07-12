import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { addIngredient, addIngredientToCocktail } from '@/store/gameSlice';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getBackBarIngredients, getSpeedLineIngredients, getIngredientsBySection } from '@/data/ingredients';
import { cn } from '@/lib/utils';

type TabType = 'back-bar' | 'speed-line' | 'garnish-tray' | 'mixers';

export default function MobileBarStation() {
  const dispatch = useDispatch();
  const { isDualMode } = useSelector((state: RootState) => state.game);
  const [activeTab, setActiveTab] = useState<TabType>('back-bar');
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);

  const backBarRows = getBackBarIngredients();
  const speedLineRows = getSpeedLineIngredients();
  const mixersIngredients = getIngredientsBySection('mixers');
  const garnishIngredients = getIngredientsBySection('garnish-tray');

  const handleIngredientClick = (ingredientId: string) => {
    if (isDualMode) {
      setSelectedIngredient(ingredientId);
    } else {
      dispatch(addIngredient(ingredientId));
    }
  };

  const handleAddToCocktail = (cocktailType: 'A' | 'B') => {
    if (selectedIngredient) {
      dispatch(addIngredientToCocktail({ cocktail: cocktailType, ingredientId: selectedIngredient }));
      setSelectedIngredient(null);
    }
  };

  const renderBackBar = () => (
    <div className="p-4 space-y-3">
      <h3 className="text-white font-medium text-center text-sm">BACK BAR</h3>
      {backBarRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}
        >
          {row.map((ingredient) => (
            <div
              key={ingredient.id}
              className={cn(
                "bottle-item bg-gradient-to-b rounded-sm min-h-16 flex items-center justify-center font-medium hover:shadow-lg transition-all cursor-pointer text-center shadow-md",
                ingredient.color,
                ingredient.category === 'bitters' ? "text-white shadow-inner" : 
                ingredient.category === 'spirits' && rowIndex === 0 ? "text-gray-900 shadow-inner" : 
                rowIndex <= 1 ? "text-gray-900 shadow-inner" : "text-white shadow-inner",
                ingredient.name.length > 20 ? "text-xs" : ingredient.name.length > 15 ? "text-sm" : "text-base"
              )}
              style={{
                padding: '6px 8px',
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
                hyphens: 'auto',
                textAlign: 'center',
                lineHeight: '1.1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => handleIngredientClick(ingredient.id)}
            >
              <span 
                className="leading-tight block"
                style={{
                  textShadow: ingredient.category === 'bitters' || rowIndex > 1 ? '0 1px 2px rgba(0,0,0,0.3)' : '0 1px 2px rgba(255,255,255,0.5)',
                  maxWidth: '100%',
                  wordBreak: 'break-word'
                }}
              >
                {ingredient.name}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderSpeedLine = () => (
    <div className="p-4 space-y-3">
      <h3 className="text-white font-medium text-center text-sm">SPEED LINE</h3>
      {speedLineRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}
        >
          {row.map((ingredient) => (
            <div
              key={ingredient.id}
              className={cn(
                "bottle-item bg-gradient-to-b rounded-sm min-h-14 flex items-center justify-center font-medium hover:shadow-lg transition-all cursor-pointer text-center",
                ingredient.color,
                ingredient.id === 'egg-white' || ingredient.id === 'milk' ? "text-gray-800" : "text-gray-800",
                ingredient.name.length > 18 ? "text-xs" : ingredient.name.length > 12 ? "text-sm" : "text-base"
              )}
              style={{
                padding: '4px 6px',
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                textAlign: 'center',
                lineHeight: '1.2'
              }}
              onClick={() => handleIngredientClick(ingredient.id)}
            >
              <span className="leading-tight">{ingredient.name}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderMixers = () => (
    <div className="p-4">
      <h3 className="text-white font-medium text-center text-sm mb-3">MIXERS</h3>
      <div className="grid gap-2 grid-cols-3">
        {mixersIngredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className={cn(
              "bottle-item bg-gradient-to-b rounded-sm min-h-16 flex items-center justify-center font-medium hover:shadow-lg transition-all cursor-pointer text-center",
              ingredient.color,
              "text-gray-800",
              ingredient.name.length > 18 ? "text-xs" : ingredient.name.length > 12 ? "text-sm" : "text-base"
            )}
            style={{
              padding: '4px 6px',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              textAlign: 'center',
              lineHeight: '1.2'
            }}
            onClick={() => handleIngredientClick(ingredient.id)}
          >
            <span className="leading-tight">{ingredient.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGarnishTray = () => (
    <div className="p-4">
      <h3 className="text-white font-medium text-center text-sm mb-3">GARNISH TRAY</h3>
      <div className="grid gap-2 grid-cols-3">
        {garnishIngredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className={cn(
              "bottle-item bg-gradient-to-b rounded-sm min-h-16 flex items-center justify-center font-medium hover:shadow-lg transition-all cursor-pointer text-center",
              ingredient.color,
              "text-white",
              ingredient.name.length > 18 ? "text-xs" : ingredient.name.length > 12 ? "text-sm" : "text-base"
            )}
            style={{
              padding: '4px 6px',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              textAlign: 'center',
              lineHeight: '1.2'
            }}
            onClick={() => handleIngredientClick(ingredient.id)}
          >
            <span className="leading-tight">{ingredient.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'back-bar':
        return renderBackBar();
      case 'speed-line':
        return renderSpeedLine();
      case 'mixers':
        return renderMixers();
      case 'garnish-tray':
        return renderGarnishTray();
      default:
        return renderBackBar();
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Tab Content */}
        <div className="flex-1 bg-bar-dark rounded-lg overflow-y-auto mb-20">
          {renderTabContent()}
        </div>

        {/* Fixed Bottom Tab Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
          <div className="grid grid-cols-4 h-16">
            <button
              onClick={() => setActiveTab('back-bar')}
              className={cn(
                "flex flex-col items-center justify-center p-2 text-xs font-medium transition-colors",
                activeTab === 'back-bar' 
                  ? "bg-blue-50 text-blue-600 border-t-2 border-blue-600" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <span className="text-lg mb-1">🍻</span>
              <span>Back Bar</span>
            </button>
            
            <button
              onClick={() => setActiveTab('speed-line')}
              className={cn(
                "flex flex-col items-center justify-center p-2 text-xs font-medium transition-colors",
                activeTab === 'speed-line' 
                  ? "bg-blue-50 text-blue-600 border-t-2 border-blue-600" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <span className="text-lg mb-1">🌊</span>
              <span>Speed Line</span>
            </button>
            
            <button
              onClick={() => setActiveTab('garnish-tray')}
              className={cn(
                "flex flex-col items-center justify-center p-2 text-xs font-medium transition-colors",
                activeTab === 'garnish-tray' 
                  ? "bg-blue-50 text-blue-600 border-t-2 border-blue-600" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <span className="text-lg mb-1">🧉</span>
              <span>Garnish Tray</span>
            </button>
            
            <button
              onClick={() => setActiveTab('mixers')}
              className={cn(
                "flex flex-col items-center justify-center p-2 text-xs font-medium transition-colors",
                activeTab === 'mixers' 
                  ? "bg-blue-50 text-blue-600 border-t-2 border-blue-600" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <span className="text-lg mb-1">👶</span>
              <span>Mixers</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dual Mode Selection Dialog */}
      <Dialog open={!!selectedIngredient} onOpenChange={() => setSelectedIngredient(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add to Which Cocktail?</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-3">
            <p className="text-sm text-gray-600">
              Select which cocktail you'd like to add this ingredient to:
            </p>
            <div className="flex space-x-3">
              <Button
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => handleAddToCocktail('A')}
              >
                Add to Cocktail A
              </Button>
              <Button
                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                onClick={() => handleAddToCocktail('B')}
              >
                Add to Cocktail B
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}