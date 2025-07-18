import { useDispatch, useSelector } from 'react-redux';
import { addIngredient } from '@/store/gameSlice';
import { getBackBarIngredients } from '@/data/ingredients';
import { cn } from '@/lib/utils';
import { RootState } from '@/store';

// Label normalization function with overrides
const labelOverrides = {
  "creme-de-mure": "Crème de Mûre",
  "martini-extra-dry": "Martini Extra Dry",
  "chartreuse": "Green Chartreuse",
  "angostura-bitters": "Angostura Bitters",
  "peychauds-bitters": "Peychaud's Bitters",
  "orange-bitters": "Orange Bitters",
  "white-creme-de-cacao": "White Crème de Cacao",
  "dark-creme-de-cacao": "Dark Crème de Cacao",
  "creme-de-cassis": "Crème de Cassis",
  "benedictine-dom": "Bénédictine DOM",
  "grants-scotch-whisky": "Grant's Scotch Whisky",
  "jack-daniels": "Jack Daniel's",
  "citron-vodka": "Citron Vodka",
  "hendricks-gin": "Hendrick's Gin",
  "patron-silver": "Patrón Silver",
  "coffee-liqueur": "Coffee Liqueur",
  "peach-liqueur": "Peach Liqueur",
  "apple-liqueur": "Apple Liqueur",
  "passionfruit-liqueur": "Passionfruit Liqueur",
  "cherry-liqueur": "Cherry Liqueur",
  "coconut-liqueur": "Coconut Liqueur",
  "amaretto-liqueur": "Amaretto Liqueur",
  "triple-sec": "Triple Sec",
  "sweet-vermouth": "Sweet Vermouth",
  "dry-vermouth": "Dry Vermouth",
  "brut-champagne": "Brut Champagne",
  "lime-cordial": "Lime Cordial"
};

// Clean label formatting function as requested
function formatLabel(id: string): string {
  return id.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase()).trim();
}

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

// Smart text wrapping for ingredient labels
const formatDisplayName = (displayName: string): string => {
  // For very long names, try to break at natural points
  if (displayName.length > 20) {
    // Try to break at common words
    const breakWords = ['De', 'Of', 'And', 'Liqueur', 'Scotch', 'Whisky', 'Bitters'];
    for (const word of breakWords) {
      if (displayName.includes(` ${word} `)) {
        return displayName.replace(` ${word} `, `\n${word} `);
      }
    }
    
    // If no natural break point, try to break at middle word
    const words = displayName.split(' ');
    if (words.length >= 3) {
      const midPoint = Math.floor(words.length / 2);
      return words.slice(0, midPoint).join(' ') + '\n' + words.slice(midPoint).join(' ');
    }
  }
  
  return displayName;
};

export default function BackBar() {
  const dispatch = useDispatch();
  const backBarRows = getBackBarIngredients();

  const handleIngredientClick = (ingredientId: string) => {
    dispatch(addIngredient(ingredientId));
  };

  return (
    <>
      <div className="bg-bar-dark rounded-lg p-4">
        <h3 className="text-white font-medium mb-3 text-center">BACK BAR</h3>
        
        {/* New grid layout with auto-fill for better ingredient display */}
        <div className="back-bar-grid">
          {backBarRows.flat().map((ingredient) => {
            const displayName = normalizeLabel(ingredient.id, ingredient.name);
            return (
              <div
                key={ingredient.id}
                className={cn(
                  "bottle bg-gradient-to-b",
                  ingredient.color,
                  // Better text color logic with stronger contrast
                  ingredient.category === 'bitters' ? "text-white" : 
                  ingredient.category === 'spirits' ? "text-gray-900" : 
                  ingredient.category === 'liqueurs' ? "text-gray-900" : "text-white"
                )}
                style={{
                  textShadow: ingredient.category === 'bitters' || ingredient.category === 'wines' ? '0 1px 2px rgba(0,0,0,0.3)' : '0 1px 2px rgba(255,255,255,0.5)'
                }}
                onClick={() => handleIngredientClick(ingredient.id)}
              >
                {displayName}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
