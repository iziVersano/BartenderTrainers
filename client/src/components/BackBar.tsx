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
          <div
            key={rowIndex}
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}
          >
            {row.map((ingredient) => (
              <div
                key={ingredient.id}
                className={cn(
                  "bottle-item bg-gradient-to-b rounded-sm min-h-12 lg:min-h-14 flex items-center justify-center font-medium hover:shadow-lg transition-all cursor-pointer text-center",
                  ingredient.color,
                  // Better text color logic based on ingredient category
                  ingredient.category === 'bitters' ? "text-white" : 
                  ingredient.category === 'spirits' && rowIndex === 0 ? "text-gray-800" : 
                  rowIndex <= 1 ? "text-gray-800" : "text-white",
                  // Dynamic text sizing based on name length
                  ingredient.name.length > 15 ? "text-xs" : "text-sm"
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
                <span className="leading-tight">
                  {ingredient.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
