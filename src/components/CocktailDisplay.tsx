import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleRecipe } from '../store/gameSlice';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Eye } from 'lucide-react';
import { METHOD_OPTIONS, GLASS_OPTIONS } from '../types';
import { getIngredientById } from '../data/ingredients';

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

export default function CocktailDisplay() {
  const dispatch = useDispatch();
  const { currentCocktail, showRecipe } = useSelector((state: RootState) => state.game);

  if (!currentCocktail) return null;

  return (
    <div className="flex-shrink-0">
      {/* Cocktail Name */}
      <div className="mb-4">
        <div className="inline-block bg-yellow-50 border border-yellow-200 rounded-lg px-6 py-2 shadow text-2xl font-bold text-yellow-900">
          {currentCocktail.name}
        </div>
      </div>

      {/* Recipe Toggle */}
      <div className="mb-4">
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => dispatch(toggleRecipe())}
            className="bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-400 text-xs shadow"
          >
            <Eye className="w-3 h-3 mr-1" />
            {showRecipe ? 'Hide Recipe' : 'Show Recipe'}
          </Button>
        </div>
      </div>

      {/* Full Recipe Display */}
      {showRecipe && (
        <div className="mb-3 bg-yellow-50 border border-yellow-200 rounded-md p-3">
          <h4 className="font-semibold text-yellow-800 mb-3 text-sm">Recipe Details</h4>
          
          <div className="space-y-2">
            {/* Method */}
            <div className="flex items-center text-xs text-yellow-700">
              <span className="font-medium">🔧 Method:</span>
              <span className="ml-2">{currentCocktail.method}</span>
            </div>
            
            {/* Glass */}
            <div className="flex items-center text-xs text-yellow-700">
              <span className="font-medium">🍸 Glass:</span>
              <span className="ml-2">{getGlassIcon(currentCocktail.glass)} {currentCocktail.glass}</span>
            </div>
            
            {/* Ice */}
            <div className="flex items-center text-xs text-yellow-700">
              <span className="font-medium">🧊 Ice:</span>
              <span className="ml-2">{currentCocktail.ice || 'Cubed'}</span>
            </div>
            
            {/* Garnish */}
            <div className="flex items-center text-xs text-yellow-700">
              <span className="font-medium">🍋 Garnish:</span>
              <span className="ml-2">{currentCocktail.garnish}</span>
            </div>
            
            {/* Ingredients */}
            <div className="text-xs text-yellow-700">
              <div className="font-medium mb-1">🧪 Ingredients:</div>
              <div className="space-y-1 ml-4">
                {currentCocktail.ingredients.map((ingredient, index) => {
                  const ingredientData = getIngredientById(ingredient.ingredientId);
                  return (
                    <div key={index} className="flex items-center">
                      <span className="w-1 h-1 bg-yellow-400 rounded-full mr-2 flex-shrink-0"></span>
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
    </div>
  );
}
