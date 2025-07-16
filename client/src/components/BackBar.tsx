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
        
        <div className="space-y-3">
          {backBarRows.map((row, rowIndex) => (
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
                      "bottle-item bg-gradient-to-b rounded-sm min-h-16 lg:min-h-20 flex items-center justify-center font-medium hover:shadow-lg transition-all cursor-pointer text-center shadow-md",
                      ingredient.color,
                      // Better text color logic with stronger contrast
                      ingredient.category === 'bitters' ? "text-white shadow-inner" : 
                      ingredient.category === 'spirits' && rowIndex === 0 ? "text-gray-900 shadow-inner" : 
                      rowIndex <= 1 ? "text-gray-900 shadow-inner" : "text-white shadow-inner",
                      // Dynamic text sizing based on display name length
                      displayName.length > 20 ? "text-xs" : displayName.length > 15 ? "text-sm" : "text-base"
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
                      {displayName}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
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
