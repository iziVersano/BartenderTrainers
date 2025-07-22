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
  if (labelOverrides[id as keyof typeof labelOverrides]) {
    return labelOverrides[id as keyof typeof labelOverrides];
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
  const [activeTab, setActiveTab] = useState<TabType | null>(null);

  const backBarRows = getBackBarIngredients();
  const speedLineRows = getSpeedLineIngredients();
  const mixersIngredients = getIngredientsBySection('mixers');
  const garnishIngredients = getIngredientsBySection('garnish-tray');

  const handleIngredientClick = (ingredientId: string) => {
    dispatch(addIngredient(ingredientId));
  };

  const handleTabChange = (tab: TabType) => {
    console.log('Switching to tab:', tab, 'Current:', activeTab);
    // Toggle: if same tab is clicked, close it; otherwise open the new tab
    setActiveTab(activeTab === tab ? null : tab);
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
                  "bottle-item bg-gradient-to-b flex items-center justify-center",
                  ingredient.color,
                  ingredient.category === 'bitters' ? "text-white" : "text-gray-900"
                )}
                onClick={() => handleIngredientClick(ingredient.id)}
              >
                <span>{formattedName}</span>
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
                  "bottle-item bg-gradient-to-b flex items-center justify-center",
                  ingredient.color,
                  "text-gray-900"
                )}
                onClick={() => handleIngredientClick(ingredient.id)}
              >
                <span>{formattedName}</span>
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
                "bottle-item bg-gradient-to-b flex items-center justify-center",
                ingredient.color,
                "text-gray-900"
              )}
              onClick={() => handleIngredientClick(ingredient.id)}
            >
              <span>{formattedName}</span>
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
                "bottle-item bg-gradient-to-b flex items-center justify-center",
                ingredient.color,
                "text-white"
              )}
              onClick={() => handleIngredientClick(ingredient.id)}
            >
              <span>{formattedName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderTabContent = () => {
    console.log('Rendering tab content for:', activeTab);
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
        {/* Fixed Bottom Layout: Sliding Panel + Tab Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-10">
          {/* Sliding Bar Panel - appears above tabs */}
          <div className={cn(
            "bg-bar-dark transition-all duration-300 ease-in-out overflow-y-auto",
            activeTab ? "h-64 border-t border-gray-600" : "h-0"
          )}>
            {activeTab && (
              <>
                <div className="bg-red-500 text-white text-xs p-1 text-center">
                  Active: {activeTab}
                </div>
                {renderTabContent()}
              </>
            )}
          </div>

          {/* Tab Navigation - Dark Mode */}
          <div className="bg-gray-800 border-t border-gray-600">
            <div className="grid grid-cols-4 h-16 gap-1 px-1">
              <button
                onClick={() => handleTabChange('back-bar')}
                className={cn(
                  "flex flex-col items-center justify-center p-2 text-xs font-bold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400",
                  activeTab === 'back-bar' 
                    ? "bg-blue-900 text-blue-200 border-t-2 border-blue-400 shadow-lg" 
                    : "text-gray-400 hover:text-blue-500 hover:bg-gray-700 active:bg-blue-800"
                )}
                tabIndex={0}
                aria-label="Back Bar"
              >
                <span className="text-xl mb-1">🍻</span>
                <span>Back Bar</span>
              </button>
              <button
                onClick={() => handleTabChange('speed-line')}
                className={cn(
                  "flex flex-col items-center justify-center p-2 text-xs font-bold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400",
                  activeTab === 'speed-line' 
                    ? "bg-blue-900 text-blue-200 border-t-2 border-blue-400 shadow-lg" 
                    : "text-gray-400 hover:text-blue-500 hover:bg-gray-700 active:bg-blue-800"
                )}
                tabIndex={0}
                aria-label="Speed Line"
              >
                <span className="text-xl mb-1">🌊</span>
                <span>Speed Line</span>
              </button>
              <button
                onClick={() => handleTabChange('garnish-tray')}
                className={cn(
                  "flex flex-col items-center justify-center p-2 text-xs font-bold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400",
                  activeTab === 'garnish-tray' 
                    ? "bg-blue-900 text-blue-200 border-t-2 border-blue-400 shadow-lg" 
                    : "text-gray-400 hover:text-blue-500 hover:bg-gray-700 active:bg-blue-800"
                )}
                tabIndex={0}
                aria-label="Garnish Tray"
              >
                <span className="text-xl mb-1">🧉</span>
                <span>Garnish Tray</span>
              </button>
              <button
                onClick={() => handleTabChange('mixers')}
                className={cn(
                  "flex flex-col items-center justify-center p-2 text-xs font-bold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400",
                  activeTab === 'mixers' 
                    ? "bg-blue-900 text-blue-200 border-t-2 border-blue-400 shadow-lg" 
                    : "text-gray-400 hover:text-blue-500 hover:bg-gray-700 active:bg-blue-800"
                )}
                tabIndex={0}
                aria-label="Mixers"
              >
                <span className="text-xl mb-1">👶</span>
                <span>Mixers</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}