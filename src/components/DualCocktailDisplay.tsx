import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { 
  toggleRecipeForCocktail, 
  addIngredientToCocktail, 
  removeIngredientFromCocktail, 
  updateIngredientAmountInCocktail,
  clearAllIngredientsFromCocktail,
  setFeedbackForCocktail,
  skipCocktailInDual,
  clearFeedbackForCocktail,
  setActiveCocktail
} from '../store/gameSlice';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Eye, Trash2, X, SkipForward, Check } from 'lucide-react';
import { METHOD_OPTIONS, GLASS_OPTIONS, AMOUNT_OPTIONS } from '../types';
import { getIngredientById } from '../data/ingredients';
import { getRandomCocktailExcluding } from '../data/cocktails';
import { Cocktail } from '../../../shared/schema';

const getGlassIcon = (glass: string): string => {
  const glassLower = glass.toLowerCase();
  if (glassLower.includes('martini') || glassLower.includes('coupe')) return '🍸';
  if (glassLower.includes('highball') || glassLower.includes('collins')) return '🥤';
  if (glassLower.includes('rocks') || glassLower.includes('old fashioned')) return '🥃';
  if (glassLower.includes('wine') || glassLower.includes('champagne')) return '🍷';
  if (glassLower.includes('shot')) return '🥃';
  if (glassLower.includes('tiki') || glassLower.includes('mug')) return '🌺';
  if (glassLower.includes('hurricane')) return '🌪️';
  if (glassLower.includes('julep')) return '🥃';
  return '🍸'; // Default glass icon
};

interface DualCocktailDisplayProps {
  cocktailType: 'A' | 'B';
  title: string;
  bgColor: string;
  borderColor: string;
  accentColor: string;
}

export default function DualCocktailDisplay({ 
  cocktailType, 
  title, 
  bgColor, 
  borderColor, 
  accentColor 
}: DualCocktailDisplayProps) {
  const dispatch = useDispatch();
  const { cocktailA, cocktailB, activeCocktail } = useSelector((state: RootState) => state.game);
  
  const session = cocktailType === 'A' ? cocktailA : cocktailB;
  const otherSession = cocktailType === 'A' ? cocktailB : cocktailA;
  const currentCocktail = session.cocktail;
  const selectedIngredients = session.selectedIngredients;
  const showRecipe = session.showRecipe;
  const feedback = session.feedback;
  const isActive = activeCocktail === cocktailType;

  if (!currentCocktail) {
    return (
      <div className="bg-red-100 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">No cocktail loaded for {cocktailType}</p>
      </div>
    );
  }

  const handleRemoveIngredient = (ingredientId: string) => {
    dispatch(removeIngredientFromCocktail({ cocktail: cocktailType, ingredientId }));
  };

  const handleAmountChange = (ingredientId: string, amount: string) => {
    dispatch(updateIngredientAmountInCocktail({ cocktail: cocktailType, ingredientId, amount }));
  };

  const handleClearAll = () => {
    dispatch(clearAllIngredientsFromCocktail(cocktailType));
  };

  const handleSkipCocktail = () => {
    // Get a random cocktail that's different from both current cocktails
    const excludeIds = [currentCocktail.id];
    if (otherSession.cocktail) {
      excludeIds.push(otherSession.cocktail.id);
    }
    const newCocktail = getRandomCocktailExcluding(excludeIds);
    dispatch(skipCocktailInDual({ cocktail: cocktailType, newCocktail }));
  };

  const handleSetActive = () => {
    dispatch(setActiveCocktail(cocktailType));
  };

  const handleCardClick = () => {
    if (!isActive) {
      dispatch(setActiveCocktail(cocktailType));
    }
  };

  // Flexible ingredient matching function
  const isMatch = (expected: string, selected: string): boolean => {
    const normalize = (str: string) => str.toLowerCase().trim().replace(/\s+/g, '');
    const a = normalize(expected);
    const b = normalize(selected);
    
    if (a.includes(b) || b.includes(a)) {
      return true;
    }
    
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
    const requiredIngredients = currentCocktail.ingredients.map(ing => {
      const ingredient = getIngredientById(ing.ingredientId);
      return ingredient ? ingredient.name : ing.ingredientId;
    });
    
    const selectedIngredientNames = selectedIngredients.map(ing => {
      const ingredient = getIngredientById(ing.ingredientId);
      return ingredient ? ingredient.name : ing.ingredientId;
    });

    const correctIngredients = requiredIngredients.filter(required => 
      selectedIngredientNames.some(selected => isMatch(required, selected))
    );

    const extraIngredients = selectedIngredientNames.filter(selected => 
      !requiredIngredients.some(required => isMatch(required, selected))
    );

    const missingIngredients = requiredIngredients.filter(required => 
      !selectedIngredientNames.some(selected => isMatch(required, selected))
    );

    const isCorrect = correctIngredients.length === requiredIngredients.length && 
                      extraIngredients.length === 0;

    let message = '';
    if (isCorrect) {
      message = `Perfect! You correctly made ${currentCocktail.name}!`;
      // Auto-load next cocktail after 2 seconds
      setTimeout(() => {
        const excludeIds = [currentCocktail.id];
        if (otherSession.cocktail) {
          excludeIds.push(otherSession.cocktail.id);
        }
        const newCocktail = getRandomCocktailExcluding(excludeIds);
        dispatch(skipCocktailInDual({ cocktail: cocktailType, newCocktail }));
      }, 2000);
    } else {
      message = `Not quite right. `;
      if (missingIngredients.length > 0) {
        message += `Missing: ${missingIngredients.join(', ')}. `;
      }
      if (extraIngredients.length > 0) {
        message += `Extra: ${extraIngredients.join(', ')}. `;
      }
      message += 'Try again!';
    }

    dispatch(setFeedbackForCocktail({ cocktail: cocktailType, isCorrect, message }));
  };

  return (
    <div className="space-y-4">
      {/* Cocktail Name Styling */}
      <div className="mb-4">
        <div className="inline-block bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 shadow text-lg font-bold text-yellow-900">
          {currentCocktail.name}
        </div>
      </div>
      {/* Ice Information */}
      <div className="mb-4">
        <div className="bg-gray-700 p-3 rounded-lg text-sm text-gray-200">
          <span className="font-medium">❄️ Ice:</span> {currentCocktail.ice || 'Cubed'}
        </div>
      </div>

      {/* Show Recipe Button */}
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => dispatch(toggleRecipeForCocktail(cocktailType))}
          className="bg-blue-600 hover:bg-blue-500 text-white text-sm border-gray-500"
        >
          <Eye className="w-4 h-4 mr-2" />
          {showRecipe ? 'Hide Recipe' : 'Show Recipe'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSkipCocktail}
          className="bg-orange-600 hover:bg-orange-500 text-white text-sm border-gray-500"
        >
          <SkipForward className="w-4 h-4 mr-2" />
          Skip
        </Button>
      </div>

      {/* Full Recipe Display */}
      {showRecipe && (
        <div className="mb-3 bg-gray-700 border border-gray-500 rounded-md p-3">
          <h5 className="font-semibold text-gray-200 mb-3 text-sm">Recipe Details</h5>
          
          <div className="space-y-2">
            {/* Method */}
            <div className="flex items-center text-xs text-gray-300">
              <span className="font-medium">🔧 Method:</span>
              <span className="ml-2">{currentCocktail.method}</span>
            </div>
            
            {/* Glass */}
            <div className="flex items-center text-xs text-gray-300">
              <span className="font-medium">🍸 Glass:</span>
              <span className="ml-2">{getGlassIcon(currentCocktail.glass)} {currentCocktail.glass}</span>
            </div>
            
            {/* Ice */}
            <div className="flex items-center text-xs text-gray-300">
              <span className="font-medium">🧊 Ice:</span>
              <span className="ml-2">{currentCocktail.ice || 'Cubed'}</span>
            </div>
            
            {/* Garnish */}
            <div className="flex items-center text-xs text-gray-300">
              <span className="font-medium">🍋 Garnish:</span>
              <span className="ml-2">{currentCocktail.garnish}</span>
            </div>
            
            {/* Ingredients */}
            <div className="text-xs text-gray-300">
              <div className="font-medium mb-1">🧪 Ingredients:</div>
              <div className="space-y-1 ml-4">
                {currentCocktail.ingredients.map((ingredient, index) => {
                  const ingredientData = getIngredientById(ingredient.ingredientId);
                  return (
                    <div key={index} className="flex items-center">
                      <span className="w-1 h-1 bg-blue-400 rounded-full mr-2 flex-shrink-0"></span>
                      <span className="font-medium">{ingredient.amount} {ingredient.unit}</span>
                      <span className="ml-2">{ingredientData?.name || ingredient.ingredientId?.replace('-', ' ') || 'Unknown ingredient'}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected Ingredients */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <h5 className="font-semibold text-gray-200 text-sm bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-1 shadow-sm text-yellow-900">Selected Ingredients</h5>
          {selectedIngredients.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              className="text-red-400 border-red-500 hover:bg-red-900 text-xs"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        <div className="space-y-2 max-h-32 overflow-y-auto bg-gray-50 border border-gray-200 rounded-md p-2">
          {selectedIngredients.length === 0 ? (
            <p className="text-gray-400 text-center py-4 text-sm">No ingredients selected</p>
          ) : (
            selectedIngredients.map((ingredient) => {
              const ingredientData = getIngredientById(ingredient.ingredientId);
              const displayName = ingredientData?.name || ingredient.ingredientId?.replace('-', ' ') || 'Unknown ingredient';
              
              return (
                <div key={ingredient.ingredientId} className="flex items-center gap-2 p-2 bg-gray-100 border border-gray-200 rounded-md">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-800">{displayName}</div>
                    <div className="text-xs text-gray-500">{ingredient.amount}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Select
                      value={ingredient.amount}
                      onValueChange={(value) => handleAmountChange(ingredient.ingredientId, value)}
                    >
                      <SelectTrigger className="w-20 h-6 text-xs">
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
                      onClick={() => handleRemoveIngredient(ingredient.ingredientId)}
                      className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Feedback */}
      {feedback.visible && (
        <div className={`p-3 rounded-md mb-3 ${feedback.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className={`text-sm ${feedback.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
            {feedback.message}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(clearFeedbackForCocktail(cocktailType))}
            className="mt-2 h-6 text-xs"
          >
            <X className="w-3 h-3 mr-1" />
            Close
          </Button>
        </div>
      )}

      {/* Submit Button */}
      <div className="mt-auto">
        <Button
          onClick={handleSubmit}
          disabled={selectedIngredients.length === 0}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <Check className="w-4 h-4 mr-2" />
          Submit {title}
        </Button>
      </div>
    </div>
  );
}