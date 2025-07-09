import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeIngredient, updateIngredientAmount, clearAllIngredients, setFeedback, loadNextCocktail, skipCocktail } from '@/store/gameSlice';
import { getIngredientById } from '@/data/ingredients';
import { getRandomCocktailExcluding, getRandomCocktail } from '@/data/cocktails';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Trash2, X, SkipForward } from 'lucide-react';
import { AMOUNT_OPTIONS } from '@/types';
import FeedbackArea from './FeedbackArea';
import CocktailDisplay from './CocktailDisplay';

export default function BuildArea() {
  const dispatch = useDispatch();
  const { selectedIngredients, currentCocktail } = useSelector((state: RootState) => state.game);

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

  const handleSubmit = () => {
    if (!currentCocktail) return;

    const requiredIngredients = currentCocktail.ingredients.map(ing => {
      const ingredient = getIngredientById(ing.ingredientId);
      return ingredient ? ingredient.name : ing.ingredientId;
    });
    
    const selectedIngredientNames = selectedIngredients.map(ing => {
      const ingredient = getIngredientById(ing.ingredientId);
      return ingredient ? ingredient.name : ing.ingredientId;
    });

    const hasAllRequired = requiredIngredients.every(required => 
      selectedIngredientNames.some(selected => isMatch(required, selected))
    );
    
    const hasOnlyRequired = selectedIngredientNames.every(selected => 
      requiredIngredients.some(required => isMatch(required, selected))
    );
    
    const isCorrect = hasAllRequired && hasOnlyRequired;

    if (isCorrect) {
      dispatch(setFeedback({
        isCorrect: true,
        message: `Perfect! You've selected all the correct ingredients for a ${currentCocktail.name}.`
      }));
      
      // Automatically load next cocktail after successful submission
      setTimeout(() => {
        const nextCocktail = getRandomCocktailExcluding(currentCocktail.id);
        dispatch(loadNextCocktail(nextCocktail));
      }, 2000); // 2 second delay to show success message
    } else {
      let message = 'Not quite right. ';
      if (!hasAllRequired) {
        const missing = requiredIngredients.filter(required => 
          !selectedIngredientNames.some(selected => isMatch(required, selected))
        );
        message += `Missing: ${missing.join(', ')}. `;
      }
      if (!hasOnlyRequired) {
        const extra = selectedIngredientNames.filter(selected => 
          !requiredIngredients.some(required => isMatch(required, selected))
        );
        message += `Extra: ${extra.join(', ')}. `;
      }
      message += 'Try again!';
      
      dispatch(setFeedback({
        isCorrect: false,
        message
      }));
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Cocktail Info Section */}
      <CocktailDisplay />

      {/* Build Area Section */}
      <div className="flex-1 flex flex-col min-h-0 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Selected Ingredients</h3>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-orange-50 hover:bg-orange-100 text-orange-600 border-orange-200"
            onClick={handleSkipCocktail}
          >
            <SkipForward className="w-4 h-4 mr-2" />
            Skip
          </Button>
        </div>

        {/* Selected Ingredients List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-2 min-h-0">
          {selectedIngredients.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              <div className="text-3xl mb-3">🍸</div>
              <p className="text-sm">Click ingredients from the bar station to add them here</p>
            </div>
          ) : (
            selectedIngredients.map((selectedIngredient) => {
              const ingredient = getIngredientById(selectedIngredient.ingredientId);
              if (!ingredient) return null;

              return (
                <div key={selectedIngredient.ingredientId} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-bar-accent rounded-full"></div>
                      <span className="font-medium text-gray-800 text-sm">{ingredient.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Select 
                        value={selectedIngredient.amount} 
                        onValueChange={(value) => handleAmountChange(selectedIngredient.ingredientId, value)}
                      >
                        <SelectTrigger className="w-24 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {AMOUNT_OPTIONS.map(amount => (
                            <SelectItem key={amount} value={amount}>
                              {amount}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveIngredient(selectedIngredient.ingredientId)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Action Buttons - Always visible */}
      <div className="flex-shrink-0 space-y-2 border-t border-gray-200 pt-4">
        <Button 
          className="w-full bg-bar-primary hover:bg-blue-700 text-white"
          onClick={handleSubmit}
          disabled={selectedIngredients.length === 0}
        >
          <Check className="w-4 h-4 mr-2" />
          Submit Cocktail
        </Button>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleClearAll}
            disabled={selectedIngredients.length === 0}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Feedback Area */}
      <div className="flex-shrink-0 mt-2">
        <FeedbackArea />
      </div>
    </div>
  );
}
