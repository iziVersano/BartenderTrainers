import { useDispatch } from 'react-redux';
import { addIngredient } from '@/store/gameSlice';
import { getIngredientsBySection } from '@/data/ingredients';
import { cn } from '@/lib/utils';

export default function FrontBar() {
  const dispatch = useDispatch();
  const speedLineIngredients = getIngredientsBySection('speed-line');
  const mixersIngredients = getIngredientsBySection('mixers');
  const garnishIngredients = getIngredientsBySection('garnish-tray');

  const handleIngredientClick = (ingredientId: string) => {
    dispatch(addIngredient(ingredientId));
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Speed Line */}
      <div className="bg-bar-surface rounded-lg p-4">
        <h4 className="text-white font-medium mb-3 text-center text-sm">SPEED LINE</h4>
        <div className="grid grid-cols-3 gap-2">
          {speedLineIngredients.map((ingredient) => (
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

      {/* Mixers */}
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

      {/* Garnish Tray */}
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
    </div>
  );
}
