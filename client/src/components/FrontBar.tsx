import { useDispatch, useSelector } from 'react-redux';
import { addIngredient } from '@/store/gameSlice';
import { RootState } from '@/store';
import { getSpeedLineIngredients, getIngredientsBySection } from '@/data/ingredients';
import { cn } from '@/lib/utils';

// Label normalization function with overrides (same as BackBar)
const labelOverrides = {
  "fresh-lime-juice": "Fresh Lime Juice",
  "fresh-lemon-juice": "Fresh Lemon Juice",
  "fresh-orange-juice": "Fresh Orange Juice",
  "sugar-syrup": "Sugar Syrup",
  "vanilla-syrup": "Vanilla Syrup",
  "cinnamon-syrup": "Cinnamon Syrup",
  "passion-fruit-puree": "Passion Fruit Purée",
  "peach-puree": "Peach Purée",
  "pineapple-juice": "Pineapple Juice",
  "cranberry-juice": "Cranberry Juice",
  "grapefruit-juice": "Grapefruit Juice",
  "tomato-juice": "Tomato Juice",
  "orange-juice": "Orange Juice",
  "lime-juice": "Lime Juice",
  "lemon-juice": "Lemon Juice",
  "mint-leaves": "Mint Leaves",
  "basil-leaves": "Basil Leaves",
  "lime-wedges": "Lime Wedges",
  "lemon-wedges": "Lemon Wedges",
  "orange-slice": "Orange Slice",
  "lemon-zest": "Lemon Zest",
  "orange-zest": "Orange Zest",
  "lime-zest": "Lime Zest",
  "celery-stick": "Celery Stick",
  "bloody-mary-pre-mix": "Bloody Mary Pre-Mix",
  "worcestershire-sauce": "Worcestershire Sauce",
  "black-pepper": "Black Pepper",
  "celery-salt": "Celery Salt",
  "coconut-cream": "Coconut Cream",
  "egg-white": "Egg White",
  "ginger-beer": "Ginger Beer",
  "ginger-ale": "Ginger Ale",
  "soda-water": "Soda Water",
  "tonic-water": "Tonic Water",
  "sprite-lemonade": "Sprite/Lemonade"
};

const normalizeLabel = (id: string, originalName: string): string => {
  // Check for specific overrides first
  if (labelOverrides[id]) {
    return labelOverrides[id];
  }
  
  // Apply normalization rules
  return originalName
    .replace(/[-_]/g, ' ')         // Replace dashes and underscores with spaces
    .replace(/\b\w/g, c => c.toUpperCase())  // Capitalize every word
    .replace(/\s{2,}/g, ' ')       // Remove extra spaces
    .trim();
};

// Clean label formatting function as requested
function formatLabel(id: string): string {
  return id.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase()).trim();
}

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
              {row.map((ingredient) => {
                const displayName = normalizeLabel(ingredient.id, ingredient.name);
                return (
                  <div
                    key={ingredient.id}
                    className={cn(
                      "bottle bg-gradient-to-b",
                      ingredient.color,
                      "text-gray-800"
                    )}
                    style={{
                      height: '45px',
                      width: '85px',
                      fontSize: '0.75rem'
                    }}
                    onClick={() => handleIngredientClick(ingredient.id)}
                  >
                    {displayName}
                  </div>
                );
              })}
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
            {mixersIngredients.map((ingredient) => {
              const displayName = normalizeLabel(ingredient.id, ingredient.name);
              return (
                <div
                  key={ingredient.id}
                  className={cn(
                    "bottle bg-gradient-to-b",
                    ingredient.color,
                    "text-gray-800"
                  )}
                  style={{
                    height: '45px',
                    width: '85px',
                    fontSize: '0.75rem'
                  }}
                  onClick={() => handleIngredientClick(ingredient.id)}
                >
                  {displayName}
                </div>
              );
            })}
          </div>
        </div>

        {/* Garnish Tray */}
        <div className="bg-bar-surface rounded-lg p-4">
          <h4 className="text-white font-medium mb-4 text-center text-sm">---------- GARNISH TRAY ----------</h4>
          <div className="grid gap-2 grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {garnishIngredients.map((ingredient) => {
              const displayName = normalizeLabel(ingredient.id, ingredient.name);
              return (
                <div
                  key={ingredient.id}
                  className={cn(
                    "bottle bg-gradient-to-b",
                    ingredient.color,
                    "text-white"
                  )}
                  style={{
                    height: '45px',
                    width: '85px',
                    fontSize: '0.75rem',
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                  }}
                  onClick={() => handleIngredientClick(ingredient.id)}
                >
                  {displayName}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
