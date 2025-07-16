import { useDispatch, useSelector } from 'react-redux';
import { addIngredient, addIngredientToCocktail } from '@/store/gameSlice';
import { getBackBarIngredients } from '@/data/ingredients';
import { cn } from '@/lib/utils';
import { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

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
  const { isDualMode } = useSelector((state: RootState) => state.game);
  const backBarRows = getBackBarIngredients();
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);

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
