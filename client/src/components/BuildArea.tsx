import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeIngredient, updateIngredientAmount, clearAllIngredients, setFeedback } from '@/store/gameSlice';
import { getIngredientById } from '@/data/ingredients';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, Trash2, X } from 'lucide-react';
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

  const handleSubmit = () => {
    if (!currentCocktail) return;

    const requiredIngredients = currentCocktail.ingredients.map(ing => ing.ingredientId);
    const selectedIngredientIds = selectedIngredients.map(ing => ing.ingredientId);

    const hasAllRequired = requiredIngredients.every(id => selectedIngredientIds.includes(id));
    const hasOnlyRequired = selectedIngredientIds.every(id => requiredIngredients.includes(id));
    const isCorrect = hasAllRequired && hasOnlyRequired;

    if (isCorrect) {
      dispatch(setFeedback({
        isCorrect: true,
        message: `Perfect! You've selected all the correct ingredients for a ${currentCocktail.name}.`
      }));
    } else {
      let message = 'Not quite right. ';
      if (!hasAllRequired) {
        const missing = requiredIngredients.filter(id => !selectedIngredientIds.includes(id));
        message += `Missing: ${missing.join(', ')}. `;
      }
      if (!hasOnlyRequired) {
        const extra = selectedIngredientIds.filter(id => !requiredIngredients.includes(id));
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
    <div className="w-2/5 bg-white p-6 border-l border-gray-200">
      <div className="h-full flex flex-col">
        {/* Build Header */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Build Area</h3>
          <p className="text-sm text-gray-600">Selected ingredients will appear here</p>
        </div>

        {/* Selected Ingredients */}
        <div className="flex-1 mb-6">
          <div className="space-y-3">
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
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleClearAll}
            disabled={selectedIngredients.length === 0}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>

        {/* Feedback Area */}
        <FeedbackArea />
      </div>
    </div>
  );
}
