import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleDualMode, removeIngredient, updateIngredientAmount, clearAllIngredients, setFeedback, loadNextCocktail, skipCocktail } from '@/store/gameSlice';
import { getIngredientById } from '@/data/ingredients';
import { getRandomCocktail } from '@/data/cocktails';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Layout, X, Trash2, SkipForward } from 'lucide-react';
import { AMOUNT_OPTIONS } from '@/types';
import CocktailDisplay from './CocktailDisplay';
import DualCocktailDisplay from './DualCocktailDisplay';
import FeedbackArea from './FeedbackArea';

export default function MobileBuildArea() {
  const dispatch = useDispatch();
  const { isDualMode, selectedIngredients, currentCocktail } = useSelector((state: RootState) => state.game);

  const handleRemoveIngredient = (ingredientId: string) => {
    dispatch(removeIngredient(ingredientId));
  };

  const handleAmountChange = (ingredientId: string, amount: string) => {
    dispatch(updateIngredientAmount({ ingredientId, amount }));
  };

  const handleClearAll = () => {
    dispatch(clearAllIngredients());
  };

  const handleSkipCocktail = () => {
    const newCocktail = getRandomCocktail();
    dispatch(skipCocktail(newCocktail));
  };

  // Flexible ingredient matching function
  const isMatch = (expected: string, selected: string): boolean => {
    const normalize = (str: string) => str.toLowerCase().trim().replace(/\s+/g, '');
    const a = normalize(expected);
    const b = normalize(selected);
    
    // Direct match after normalization (handles spacing issues)
    if (a.includes(b) || b.includes(a)) {
      return true;
    }
    
    // Handle specific variations
    const variations = [
      ['passionfruit', 'passionfruit'],
      ['passion fruit', 'passionfruit'],
      ['peach puree', 'peach purée'],
      ['peach purée', 'peach puree']
    ];
    
    for (const [variant1, variant2] of variations) {
      const norm1 = normalize(variant1);
      const norm2 = normalize(variant2);
      if ((a.includes(norm1) && b.includes(norm2)) ||
          (a.includes(norm2) && b.includes(norm1))) {
        return true;
      }
    }
    
    return false;
  };

  const handleSubmitCocktail = () => {
    if (!currentCocktail) return;

    const requiredIngredients = currentCocktail.ingredients.map(ing => ing.name);
    const selectedIngredientNames = selectedIngredients.map(ing => {
      const ingredientData = getIngredientById(ing.ingredientId);
      return ingredientData?.name || ing.ingredientId;
    });

    const missingIngredients = requiredIngredients.filter(required => 
      !selectedIngredientNames.some(selected => isMatch(required, selected))
    );

    const extraIngredients = selectedIngredientNames.filter(selected => 
      !requiredIngredients.some(required => isMatch(required, selected))
    );

    if (missingIngredients.length === 0 && extraIngredients.length === 0) {
      // Perfect match
      dispatch(setFeedback({
        visible: true,
        isCorrect: true,
        message: `Perfect! You've made a ${currentCocktail.name} correctly!`
      }));
      
      // Auto-load next cocktail after 2 seconds
      setTimeout(() => {
        dispatch(loadNextCocktail());
      }, 2000);
    } else {
      // Incorrect
      let message = `Not quite right for ${currentCocktail.name}. `;
      
      if (missingIngredients.length > 0) {
        message += `Missing: ${missingIngredients.join(', ')}. `;
      }
      
      if (extraIngredients.length > 0) {
        message += `Extra: ${extraIngredients.join(', ')}.`;
      }
      
      dispatch(setFeedback({
        visible: true,
        isCorrect: false,
        message: message
      }));
    }
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      {/* Header with Dual Mode Toggle */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Build Area</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Dual Mode</span>
          <Switch
            checked={isDualMode}
            onCheckedChange={() => dispatch(toggleDualMode())}
          />
          <Layout className="w-4 h-4 text-gray-600" />
        </div>
      </div>

      {/* Build Area Content */}
      <div className="flex-1 overflow-y-auto">
        {isDualMode ? (
          <div className="space-y-4">
            <DualCocktailDisplay 
              cocktailType="A" 
              title="Cocktail A"
              bgColor="bg-blue-50"
              borderColor="border-blue-200"
              accentColor="bg-blue-500 hover:bg-blue-600"
            />
            <DualCocktailDisplay 
              cocktailType="B" 
              title="Cocktail B"
              bgColor="bg-green-50"
              borderColor="border-green-200"
              accentColor="bg-green-500 hover:bg-green-600"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <CocktailDisplay />
            {/* Build Area content without duplicate cocktail display */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Build Your Cocktail</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => dispatch(toggleDualMode())}
                    className="flex items-center space-x-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
                  >
                    <Layout className="w-4 h-4" />
                    <span className="text-sm">Dual Mode</span>
                  </button>
                </div>
              </div>
              
              {/* Selected Ingredients */}
              <div className="space-y-2 mb-4">
                {selectedIngredients.map((ingredient, index) => {
                  const ingredientData = getIngredientById(ingredient.ingredientId);
                  return (
                    <div key={`${ingredient.ingredientId}-${index}`} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-medium text-gray-700">{ingredientData?.name || ingredient.ingredientId}</span>
                      <div className="flex items-center space-x-2">
                        <select
                          value={ingredient.amount}
                          onChange={(e) => handleAmountChange(ingredient.ingredientId, e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        >
                          {AMOUNT_OPTIONS.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleRemoveIngredient(ingredient.ingredientId)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Actions */}
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                  <button
                    onClick={handleClearAll}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Clear All</span>
                  </button>
                  <button
                    onClick={handleSkipCocktail}
                    className="flex-1 px-4 py-2 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors flex items-center justify-center space-x-2"
                  >
                    <SkipForward className="w-4 h-4" />
                    <span>Skip</span>
                  </button>
                </div>
                <button
                  onClick={handleSubmitCocktail}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
                >
                  Submit Cocktail
                </button>
              </div>
            </div>
            <FeedbackArea />
          </div>
        )}
      </div>
    </div>
  );
}