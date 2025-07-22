import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { RootState } from '@/store';
import { toggleDualMode, removeIngredient, updateIngredientAmount, clearAllIngredients, setFeedback, nextTrainingCocktail, restartTraining, setActiveCocktail, setCocktailA, setCocktailB } from '@/store/gameSlice';
import { getIngredientById } from '@/data/ingredients';
import { shuffleCocktails, getRandomCocktailExcluding } from '@/data/cocktails';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Layout, X, Trash2, SkipForward } from 'lucide-react';
import { AMOUNT_OPTIONS } from '@/types';
import CocktailDisplay from './CocktailDisplay';
import DualCocktailDisplay from './DualCocktailDisplay';
import FeedbackArea from './FeedbackArea';

export default function MobileBuildArea() {
  const dispatch = useDispatch();
  const { isDualMode, selectedIngredients, currentCocktail, trainingComplete, currentTrainingIndex, trainingSequence, activeCocktail, cocktailA, cocktailB } = useSelector((state: RootState) => state.game);
  const dualModeRef = useRef<HTMLDivElement>(null);
  const buildAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to dual mode content when toggled on mobile
  useEffect(() => {
    if (isDualMode && dualModeRef.current && buildAreaRef.current) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        dualModeRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  }, [isDualMode]);

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
    dispatch(nextTrainingCocktail());
  };

  const handleToggleDualMode = () => {
    if (!isDualMode) {
      // Entering dual mode - initialize both cocktails
      try {
        const cocktailACandidate = getRandomCocktailExcluding([]);
        const cocktailBCandidate = getRandomCocktailExcluding([cocktailACandidate.id]);
        
        dispatch(setCocktailA(cocktailACandidate));
        dispatch(setCocktailB(cocktailBCandidate));
      } catch (error) {
        console.error('Error loading cocktails for dual mode:', error);
      }
    }
    dispatch(toggleDualMode());
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

    const requiredIngredients = currentCocktail.ingredients.map(ing => ing.ingredientId);
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
        isCorrect: true,
        message: `Perfect! You've made a ${currentCocktail.name} correctly!`
      }));
      
      // Auto-load next cocktail after 2 seconds
      setTimeout(() => {
        dispatch(nextTrainingCocktail());
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
        isCorrect: false,
        message: message
      }));
    }
  };

  return (
    <div ref={buildAreaRef} className="flex flex-col h-full p-4 space-y-4 pb-20">
      {/* Header with Dual Mode Toggle */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Build Area</h2>
        <div className="flex items-center space-x-3 p-2 bg-gray-100 rounded-xl shadow-md border border-gray-200">
          <span className="text-base font-semibold text-gray-700 mr-2">Dual Mode</span>
          <Switch
            checked={isDualMode}
            onCheckedChange={handleToggleDualMode}
            className={`scale-125 ${isDualMode ? 'bg-green-600 border-green-700' : 'bg-gray-300 border-gray-400'}`}
          />
        </div>
      </div>

      {/* Build Area Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Cocktail Name Styling Example (if present) */}
        {currentCocktail && (
          <div className="mb-4">
            <div className="inline-block bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 shadow-sm text-lg font-bold text-yellow-900">
              {currentCocktail.name}
            </div>
          </div>
        )}
        {isDualMode ? (
          <div ref={dualModeRef} className="space-y-4">
            {/* Mobile Tabbed Interface */}
            <div className="space-y-4">
              {/* Tab Navigation */}
              <div className="flex space-x-2">
                <button
                  onClick={() => dispatch(setActiveCocktail('A'))}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                    activeCocktail === 'A' 
                      ? 'bg-blue-900 border-blue-400 text-blue-200' 
                      : 'bg-gray-700 border-gray-500 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-lg">
                      {activeCocktail === 'A' ? '🔘' : '⚪'}
                    </span>
                    <span className="font-medium">
                      {cocktailA.cocktail?.name || 'Loading...'} (A)
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => dispatch(setActiveCocktail('B'))}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                    activeCocktail === 'B' 
                      ? 'bg-green-900 border-green-400 text-green-200' 
                      : 'bg-gray-700 border-gray-500 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-lg">
                      {activeCocktail === 'B' ? '🔘' : '⚪'}
                    </span>
                    <span className="font-medium">
                      {cocktailB.cocktail?.name || 'Loading...'} (B)
                    </span>
                  </div>
                </button>
              </div>

              {/* Active Cocktail Display */}
              {activeCocktail === 'A' ? (
                <DualCocktailDisplay 
                  cocktailType="A" 
                  title={`${cocktailA.cocktail?.name || 'Loading...'} (A)`}
                  bgColor="bg-gray-800"
                  borderColor="border-blue-400"
                  accentColor="bg-blue-600 hover:bg-blue-500"
                />
              ) : (
                <DualCocktailDisplay 
                  cocktailType="B" 
                  title={`${cocktailB.cocktail?.name || 'Loading...'} (B)`}
                  bgColor="bg-gray-800"
                  borderColor="border-green-400"
                  accentColor="bg-green-600 hover:bg-green-500"
                />
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Training Progress */}
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-600">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-200">Training Progress</span>
                <span className="text-gray-300">{currentTrainingIndex + 1} / {trainingSequence.length}</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentTrainingIndex + 1) / trainingSequence.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Training Complete Message */}
            {trainingComplete ? (
              <div className="bg-green-900 border border-green-400 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="text-xl font-semibold text-green-200 mb-2">Training Complete!</h3>
                <p className="text-green-300 mb-4">All cocktails reviewed. Great job!</p>
                <button 
                  onClick={() => dispatch(restartTraining(shuffleCocktails()))}
                  className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Restart Training
                </button>
              </div>
            ) : (
              <>
                <CocktailDisplay />
                {/* Build Area content without duplicate cocktail display */}
                <div className="bg-gray-800 rounded-lg border border-gray-600 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Build Your Cocktail</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => dispatch(toggleDualMode())}
                    className="flex items-center space-x-2 px-3 py-2 bg-purple-700 text-purple-200 rounded-md hover:bg-purple-600 transition-colors"
                  >
                    <Layout className="w-4 h-4" />
                    <span className="text-sm">Dual Mode</span>
                  </button>
                </div>
              </div>
              
              {/* Improve contrast for Selected Ingredients */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm mb-2">
                <h4 className="text-base font-semibold text-gray-800 mb-2">Selected Ingredients</h4>
                {selectedIngredients.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-500 rounded-lg bg-gray-700">
                    <div className="text-5xl mb-4">🍸</div>
                    <p className="text-lg font-semibold text-gray-200 mb-2">Start Building Your Cocktail!</p>
                    <p className="text-sm text-gray-400">👆 Tap ingredients from the bar below to add them here</p>
                    <div className="mt-4 flex items-center justify-center space-x-2 text-blue-400">
                      <span className="animate-pulse">📱</span>
                      <span className="text-sm font-medium">Touch ingredients to select</span>
                    </div>
                  </div>
                ) : (
                  selectedIngredients.map((ingredient, index) => {
                    const ingredientData = getIngredientById(ingredient.ingredientId);
                    return (
                      <div key={`${ingredient.ingredientId}-${index}`} className="flex items-center justify-between p-2 bg-gray-700 border border-gray-600 rounded">
                        <span className="font-medium text-gray-200">{ingredientData?.name || ingredient.ingredientId}</span>
                        <div className="flex items-center space-x-2">
                          <select
                            value={ingredient.amount}
                            onChange={(e) => handleAmountChange(ingredient.ingredientId, e.target.value)}
                            className="px-2 py-1 border border-gray-500 rounded text-sm bg-gray-600 text-gray-200"
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
                  })
                )}
              </div>
              
              {/* Actions */}
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                  <button
                    onClick={handleClearAll}
                    className="flex-1 px-4 py-2 bg-gray-600 text-gray-200 rounded-md hover:bg-gray-500 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Clear All</span>
                  </button>
                  <button
                    onClick={handleSkipCocktail}
                    className="flex-1 px-4 py-2 bg-orange-700 text-orange-200 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <SkipForward className="w-4 h-4" />
                    <span>Skip</span>
                  </button>
                </div>
                <button
                  onClick={handleSubmitCocktail}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors font-medium"
                >
                  Submit Cocktail
                </button>
              </div>
                </div>
                <FeedbackArea />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}