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
    <div className="w-full space-y-4">
      {/* Speed Line */}
      <div className="bg-bar-surface rounded-lg p-4 max-w-6xl mx-auto">
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
                    "bottle-item bg-gradient-to-b rounded-sm min-h-14 lg:min-h-16 flex items-center justify-center font-medium hover:shadow-lg transition-all cursor-pointer text-center",
                    ingredient.color,
                    ingredient.id === 'egg-white' || ingredient.id === 'milk' ? "text-gray-800" : "text-gray-800",
                    // Dynamic text sizing based on name length
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
      </div>

      {/* Mixers and Garnish Tray - Side by Side */}
      <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto">
        {/* Mixers */}
        <div className="bg-bar-surface rounded-lg p-4">
          <h4 className="text-white font-medium mb-4 text-center text-sm">---------- MIXERS ----------</h4>
          <div className="grid gap-2 grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {mixersIngredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className={cn(
                  "bottle-item bg-gradient-to-b rounded-sm min-h-14 lg:min-h-16 flex items-center justify-center font-medium hover:shadow-lg transition-all cursor-pointer text-center",
                  ingredient.color,
                  "text-gray-800",
                  // Dynamic text sizing based on name length
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

        {/* Garnish Tray */}
        <div className="bg-bar-surface rounded-lg p-4">
          <h4 className="text-white font-medium mb-4 text-center text-sm">---------- GARNISH TRAY ----------</h4>
          <div className="grid gap-2 grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {garnishIngredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className={cn(
                  "bottle-item bg-gradient-to-b rounded-sm min-h-14 lg:min-h-16 flex items-center justify-center font-medium hover:shadow-lg transition-all cursor-pointer text-center",
                  ingredient.color,
                  "text-white",
                  // Dynamic text sizing based on name length
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
      </div>
    </div>
  );
}
