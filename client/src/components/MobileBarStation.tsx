import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { addIngredient } from '@/store/gameSlice';
import { getBackBarIngredients, getSpeedLineIngredients, getIngredientsBySection } from '@/data/ingredients';
import { cn } from '@/lib/utils';

// Label normalization function with overrides (same as BackBar)
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

// Smart text wrapping for ingredient labels  
const formatDisplayName = (displayName: string): string => {
  // For very long names, try to break at natural points
  if (displayName.length > 16) {
    // Try to break at common words
    const breakWords = ['De', 'Of', 'And', 'Liqueur', 'Scotch', 'Whisky', 'Bitters', 'Juice', 'Syrup', 'Purée', 'Leaves', 'Wedges', 'Slice', 'Zest', 'Pre-Mix', 'Sauce', 'Pepper', 'Salt', 'Cream', 'White', 'Beer', 'Ale', 'Water'];
    for (const word of breakWords) {
      if (displayName.includes(` ${word} `)) {
        return displayName.replace(` ${word} `, `\n${word} `);
      }
      if (displayName.includes(` ${word}`)) {
        return displayName.replace(` ${word}`, `\n${word}`);
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

type TabType = 'back-bar' | 'speed-line' | 'garnish-tray' | 'mixers';

export default function MobileBarStation() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<TabType>('back-bar');

  const backBarRows = getBackBarIngredients();
  const speedLineRows = getSpeedLineIngredients();
  const mixersIngredients = getIngredientsBySection('mixers');
  const garnishIngredients = getIngredientsBySection('garnish-tray');

  const handleIngredientClick = (ingredientId: string) => {
    dispatch(addIngredient(ingredientId));
  };

  const renderBackBar = () => {
    // Flatten all ingredients from all rows for mobile grid layout
    const allBackBarIngredients = backBarRows.flat();
    
    return (
      <div className="p-4">
        <h3 className="text-white font-medium text-center text-sm mb-3">BACK BAR</h3>
        <div className="grid gap-2 grid-cols-3">
          {allBackBarIngredients.map((ingredient) => {
            const displayName = normalizeLabel(ingredient.id, ingredient.name);
            const formattedName = formatDisplayName(displayName);
            return (
              <div
                key={ingredient.id}
                className={cn(
                  "bottle-item bg-gradient-to-b rounded-sm min-h-18 flex items-center justify-center font-medium hover:shadow-lg transition-all cursor-pointer text-center shadow-md",
                  ingredient.color,
                  ingredient.category === 'bitters' ? "text-white shadow-inner" : 
                  ingredient.category === 'spirits' ? "text-gray-900 shadow-inner" : 
                  ingredient.category === 'liqueurs' ? "text-gray-900 shadow-inner" : "text-white shadow-inner"
                )}
                style={{
                  padding: '6px 8px',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '90px'
                }}
                onClick={() => handleIngredientClick(ingredient.id)}
              >
                <span 
                  className="leading-tight block font-medium"
                  style={{
                    textShadow: ingredient.category === 'bitters' || ingredient.category === 'wines' ? '0 1px 2px rgba(0,0,0,0.3)' : '0 1px 2px rgba(255,255,255,0.5)',
                    whiteSpace: 'pre-line',
                    fontSize: displayName.length > 14 ? '0.65rem' : displayName.length > 10 ? '0.75rem' : displayName.length > 8 ? '0.85rem' : '0.9rem',
                    lineHeight: '1.2',
                    maxWidth: '100%'
                  }}
                >
                  {formattedName}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSpeedLine = () => {
    // Flatten all ingredients from all rows for mobile grid layout
    const allSpeedLineIngredients = speedLineRows.flat();
    
    return (
      <div className="p-4">
        <h3 className="text-white font-medium text-center text-sm mb-3">SPEED LINE</h3>
        <div className="grid gap-2 grid-cols-3">
          {allSpeedLineIngredients.map((ingredient) => {
            const displayName = normalizeLabel(ingredient.id, ingredient.name);
            const formattedName = formatDisplayName(displayName);
            return (
              <div
                key={ingredient.id}
                className={cn(
                  "bottle-item bg-gradient-to-b rounded-sm min-h-18 flex items-center justify-center font-medium hover:shadow-lg transition-all cursor-pointer text-center",
                  ingredient.color,
                  "text-gray-800"
                )}
                style={{
                  padding: '6px 8px',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '90px'
                }}
                onClick={() => handleIngredientClick(ingredient.id)}
              >
                <span 
                  className="leading-tight block font-medium"
                  style={{
                    whiteSpace: 'pre-line',
                    fontSize: displayName.length > 14 ? '0.65rem' : displayName.length > 10 ? '0.75rem' : displayName.length > 8 ? '0.85rem' : '0.9rem',
                    lineHeight: '1.2',
                    maxWidth: '100%'
                  }}
                >
                  {formattedName}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMixers = () => (
    <div className="p-4">
      <h3 className="text-white font-medium text-center text-sm mb-3">MIXERS</h3>
      <div className="grid gap-2 grid-cols-3">
        {mixersIngredients.map((ingredient) => {
          const displayName = normalizeLabel(ingredient.id, ingredient.name);
          const formattedName = formatDisplayName(displayName);
          return (
            <div
              key={ingredient.id}
              className={cn(
                "bottle-item bg-gradient-to-b rounded-sm min-h-18 flex items-center justify-center font-medium hover:shadow-lg transition-all cursor-pointer text-center",
                ingredient.color,
                "text-gray-800"
              )}
              style={{
                padding: '6px 8px',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '90px'
              }}
              onClick={() => handleIngredientClick(ingredient.id)}
            >
              <span 
                className="leading-tight block font-medium"
                style={{
                  whiteSpace: 'pre-line',
                  fontSize: displayName.length > 14 ? '0.65rem' : displayName.length > 10 ? '0.75rem' : displayName.length > 8 ? '0.85rem' : '0.9rem',
                  lineHeight: '1.2',
                  maxWidth: '100%'
                }}
              >
                {formattedName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderGarnishTray = () => (
    <div className="p-4">
      <h3 className="text-white font-medium text-center text-sm mb-3">GARNISH TRAY</h3>
      <div className="grid gap-2 grid-cols-3">
        {garnishIngredients.map((ingredient) => {
          const displayName = normalizeLabel(ingredient.id, ingredient.name);
          const formattedName = formatDisplayName(displayName);
          return (
            <div
              key={ingredient.id}
              className={cn(
                "bottle-item bg-gradient-to-b rounded-sm min-h-18 flex items-center justify-center font-medium hover:shadow-lg transition-all cursor-pointer text-center",
                ingredient.color,
                "text-white"
              )}
              style={{
                padding: '6px 8px',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '90px'
              }}
              onClick={() => handleIngredientClick(ingredient.id)}
            >
              <span 
                className="leading-tight block font-medium"
                style={{
                  whiteSpace: 'pre-line',
                  fontSize: displayName.length > 14 ? '0.65rem' : displayName.length > 10 ? '0.75rem' : displayName.length > 8 ? '0.85rem' : '0.9rem',
                  lineHeight: '1.2',
                  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  maxWidth: '100%'
                }}
              >
                {formattedName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'back-bar':
        return renderBackBar();
      case 'speed-line':
        return renderSpeedLine();
      case 'mixers':
        return renderMixers();
      case 'garnish-tray':
        return renderGarnishTray();
      default:
        return renderBackBar();
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Tab Content */}
        <div className="flex-1 bg-bar-dark rounded-lg overflow-y-auto mb-20">
          {renderTabContent()}
        </div>

        {/* Fixed Bottom Tab Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
          <div className="grid grid-cols-4 h-16">
            <button
              onClick={() => setActiveTab('back-bar')}
              className={cn(
                "flex flex-col items-center justify-center p-2 text-xs font-medium transition-colors",
                activeTab === 'back-bar' 
                  ? "bg-blue-50 text-blue-600 border-t-2 border-blue-600" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <span className="text-lg mb-1">🍻</span>
              <span>Back Bar</span>
            </button>
            
            <button
              onClick={() => setActiveTab('speed-line')}
              className={cn(
                "flex flex-col items-center justify-center p-2 text-xs font-medium transition-colors",
                activeTab === 'speed-line' 
                  ? "bg-blue-50 text-blue-600 border-t-2 border-blue-600" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <span className="text-lg mb-1">🌊</span>
              <span>Speed Line</span>
            </button>
            
            <button
              onClick={() => setActiveTab('garnish-tray')}
              className={cn(
                "flex flex-col items-center justify-center p-2 text-xs font-medium transition-colors",
                activeTab === 'garnish-tray' 
                  ? "bg-blue-50 text-blue-600 border-t-2 border-blue-600" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <span className="text-lg mb-1">🧉</span>
              <span>Garnish Tray</span>
            </button>
            
            <button
              onClick={() => setActiveTab('mixers')}
              className={cn(
                "flex flex-col items-center justify-center p-2 text-xs font-medium transition-colors",
                activeTab === 'mixers' 
                  ? "bg-blue-50 text-blue-600 border-t-2 border-blue-600" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <span className="text-lg mb-1">👶</span>
              <span>Mixers</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}