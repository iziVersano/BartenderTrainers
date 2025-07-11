import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleRecipe } from '@/store/gameSlice';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye } from 'lucide-react';
import { METHOD_OPTIONS, GLASS_OPTIONS } from '@/types';
import { getIngredientById } from '@/data/ingredients';

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
      <div className="mb-3">
        <h2 className="text-2xl font-bold text-gray-800">{currentCocktail.name}</h2>
      </div>

      {/* Dropdowns and Controls */}
      <div className="mb-3 space-y-2">
        {/* Method and Glass Dropdowns */}
        <div className="grid grid-cols-2 gap-2">
          <Select value={currentCocktail.method}>
            <SelectTrigger className="text-sm bg-yellow-50 border-yellow-200 text-yellow-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {METHOD_OPTIONS.map(method => (
                <SelectItem key={method} value={method}>
                  {method.charAt(0).toUpperCase() + method.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={currentCocktail.glass}>
            <SelectTrigger className="text-sm bg-yellow-50 border-yellow-200 text-yellow-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GLASS_OPTIONS.map(glass => (
                <SelectItem key={glass} value={glass}>
                  {glass.charAt(0).toUpperCase() + glass.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Method, Ice and Garnish Info */}
        <div className="space-y-2">
          {/* Method */}
          <div className="bg-blue-50 p-2 rounded text-xs text-blue-700">
            <span className="font-medium">Method:</span> {currentCocktail.method}
          </div>
          
          {/* Glass Type */}
          <div className="bg-purple-50 p-2 rounded text-xs text-purple-700">
            <span className="font-medium">Glass:</span> {getGlassIcon(currentCocktail.glass)} {currentCocktail.glass}
          </div>

          {/* Ice and Garnish */}
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div className="bg-gray-50 p-2 rounded">
              <span className="font-medium">❄️ Ice:</span> {currentCocktail.ice || 'Cubed'}
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <span className="font-medium">🍋 Garnish:</span> {currentCocktail.garnish}
            </div>
          </div>
        </div>

        {/* Show Recipe Toggle */}
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => dispatch(toggleRecipe())}
            className="bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-400 text-xs"
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
            {/* Ice */}
            <div className="flex items-center text-xs text-yellow-700">
              <span className="font-medium">🧊 Ice:</span>
              <span className="ml-2">{currentCocktail.ice || 'Cubed'}</span>
            </div>
            
            {/* Glass */}
            <div className="flex items-center text-xs text-yellow-700">
              <span className="font-medium">🍸 Glass:</span>
              <span className="ml-2">{getGlassIcon(currentCocktail.glass)} {currentCocktail.glass}</span>
            </div>
            
            {/* Garnish */}
            <div className="flex items-center text-xs text-yellow-700">
              <span className="font-medium">🍋 Garnish:</span>
              <span className="ml-2">{currentCocktail.garnish}</span>
            </div>
            
            {/* Method */}
            <div className="flex items-center text-xs text-yellow-700">
              <span className="font-medium">🔧 Method:</span>
              <span className="ml-2">{currentCocktail.method}</span>
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
