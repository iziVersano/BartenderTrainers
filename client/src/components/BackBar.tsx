import { useDispatch } from 'react-redux';
import { addIngredient } from '@/store/gameSlice';
import { getBackBarIngredients } from '@/data/ingredients';
import { cn } from '@/lib/utils';

export default function BackBar() {
  const dispatch = useDispatch();
  const backBarRows = getBackBarIngredients();

  const handleIngredientClick = (ingredientId: string) => {
    dispatch(addIngredient(ingredientId));
  };

  return (
    <div className="bg-bar-dark rounded-lg p-4">
      <h3 className="text-white font-medium mb-3 text-center">BACK BAR</h3>
      
      <div className="space-y-3">
        {backBarRows.map((row, rowIndex) => (
          <div key={rowIndex} className={cn(
            "grid gap-2",
            rowIndex === 0 ? "grid-cols-10" : rowIndex === 1 ? "grid-cols-14" : "grid-cols-10"
          )}>
            {row.map((ingredient) => (
              <div
                key={ingredient.id}
                className={cn(
                  "bottle-item bg-gradient-to-b rounded-sm h-12 flex items-center justify-center text-xs font-medium hover:shadow-lg transition-all cursor-pointer px-1 text-center",
                  ingredient.color,
                  rowIndex <= 1 ? "text-gray-800" : "text-white"
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
  );
}
