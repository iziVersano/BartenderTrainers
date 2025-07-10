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
                  "bottle-item bg-gradient-to-b rounded-sm min-h-16 lg:min-h-20 flex items-center justify-center font-medium hover:shadow-lg transition-all cursor-pointer text-center shadow-md",
                  ingredient.color,
                  // Better text color logic with stronger contrast
                  ingredient.category === 'bitters' ? "text-white shadow-inner" : 
                  ingredient.category === 'spirits' && rowIndex === 0 ? "text-gray-900 shadow-inner" : 
                  rowIndex <= 1 ? "text-gray-900 shadow-inner" : "text-white shadow-inner",
                  // Dynamic text sizing based on name length
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
    </div>
  );
}
