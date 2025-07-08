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
    const a = expected.toLowerCase();
    const b = selected.toLowerCase();
    return a.includes(b) || b.includes(a);
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
    <div className="w-full lg:w-3/10 bg-white p-4 lg:p-6 border-l-0 lg:border-l border-gray-200">
      <div className="h-full flex flex-col">
        {/* Build Header */}
        <div className="mb-4 lg:mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Build Area</h3>
          <p className="text-sm text-gray-600">Selected ingredients will appear here</p>
        </div>

        {/* Selected Ingredients */}
        <div className="flex-1 mb-4 lg:mb-6">
          <div className="space-y-2 lg:space-y-3">
            {selectedIngredients.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-4">🍸</div>
                <p>Click ingredients from the bar station to add them here</p>
              </div>
            ) : (
              selectedIngredients.map((selectedIngredient) => {
                const ingredient = getIngredientById(selectedIngredient.ingredientId);
                if (!ingredient) return null;

                return (
                  <div key={selectedIngredient.ingredientId} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-bar-accent rounded-full"></div>
                        <span className="font-medium text-gray-800">{ingredient.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select 
                          value={selectedIngredient.amount} 
                          onValueChange={(value) => handleAmountChange(selectedIngredient.ingredientId, value)}
                        >
                          <SelectTrigger className="w-32">
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
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-bar-primary hover:bg-blue-700 text-white"
            onClick={handleSubmit}
            disabled={selectedIngredients.length === 0}
          >
            <Check className="w-4 h-4 mr-2" />
            Submit Cocktail
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleClearAll}
              disabled={selectedIngredients.length === 0}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 bg-orange-50 hover:bg-orange-100 text-orange-600 border-orange-200"
              onClick={handleSkipCocktail}
            >
              <SkipForward className="w-4 h-4 mr-2" />
              Skip Cocktail
            </Button>
          </div>
        </div>

        {/* Feedback Area */}
        <FeedbackArea />
      </div>
    </div>
  );
}
