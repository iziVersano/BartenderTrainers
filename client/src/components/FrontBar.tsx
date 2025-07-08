import { useDispatch } from 'react-redux';
import { addIngredient } from '@/store/gameSlice';
import { getSpeedLineIngredients, getIngredientsBySection } from '@/data/ingredients';
import { cn } from '@/lib/utils';

export default function FrontBar() {
  const dispatch = useDispatch();
  const speedLineRows = getSpeedLineIngredients();
  const mixersIngredients = getIngredientsBySection('mixers');
  const garnishIngredients = getIngredientsBySection('garnish-tray');

  const handleIngredientClick = (ingredientId: string) => {
    dispatch(addIngredient(ingredientId));
  };

  return (
    <div className="w-full">
      {/* Speed Line Only */}
      <div className="bg-bar-surface rounded-lg p-4 max-w-4xl mx-auto">
        <h4 className="text-white font-medium mb-4 text-center text-sm">---------- SPEED LINE ----------</h4>
        <div className="space-y-3">
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
                    "bottle-item bg-gradient-to-b rounded-sm h-12 flex items-center justify-center text-xs font-medium hover:shadow-lg transition-all cursor-pointer px-2 text-center",
                    ingredient.color,
                    ingredient.id === 'egg-white' ? "text-gray-800" : "text-gray-800"
                  )}
                  onClick={() => handleIngredientClick(ingredient.id)}
                >
                  <span className="leading-tight">{ingredient.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Mixers - Temporarily commented out */}
      {/* 
      <div className="bg-bar-surface rounded-lg p-4">
        <h4 className="text-white font-medium mb-3 text-center text-sm">MIXERS</h4>
        <div className="grid grid-cols-2 gap-2">
          {mixersIngredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className={cn(
                "ingredient-item bg-gradient-to-b rounded-sm h-10 flex items-center justify-center text-xs font-medium text-gray-800 hover:shadow-lg transition-all cursor-pointer",
                ingredient.color
              )}
              onClick={() => handleIngredientClick(ingredient.id)}
            >
              {ingredient.name}
            </div>
          ))}
        </div>
      </div>
      */}

      {/* Garnish Tray - Temporarily commented out */}
      {/* 
      <div className="bg-bar-surface rounded-lg p-4">
        <h4 className="text-white font-medium mb-3 text-center text-sm">GARNISH TRAY</h4>
        <div className="grid grid-cols-2 gap-2">
          {garnishIngredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className={cn(
                "ingredient-item bg-gradient-to-b rounded-sm h-10 flex items-center justify-center text-xs font-medium hover:shadow-lg transition-all cursor-pointer",
                ingredient.color,
                ingredient.id === 'salt-rim' ? 'text-gray-800' : 'text-white'
              )}
              onClick={() => handleIngredientClick(ingredient.id)}
            >
              {ingredient.name}
            </div>
          ))}
        </div>
      </div>
      */}
    </div>
  );
}
