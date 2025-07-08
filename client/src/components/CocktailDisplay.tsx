import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleRecipe } from '@/store/gameSlice';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye } from 'lucide-react';
import { METHOD_OPTIONS, GLASS_OPTIONS } from '@/types';
import { getIngredientById } from '@/data/ingredients';

export default function CocktailDisplay() {
  const dispatch = useDispatch();
  const { currentCocktail, showRecipe } = useSelector((state: RootState) => state.game);

  if (!currentCocktail) return null;

  return (
    <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{currentCocktail.name}</h2>
          <p className="text-sm text-gray-600">Build this cocktail using the station below</p>
          {showRecipe && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm">
              <h3 className="font-semibold text-yellow-800 mb-4 text-base">📝 Recipe Details</h3>
              
              {/* Recipe Parameters */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center space-x-2 bg-white p-2 rounded-md border border-yellow-100">
                  <span className="text-lg">🥃</span>
                  <span className="text-yellow-700"><strong>Glass:</strong> {currentCocktail.glass}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white p-2 rounded-md border border-yellow-100">
                  <span className="text-lg">❄️</span>
                  <span className="text-yellow-700"><strong>Ice:</strong> {currentCocktail.ice || 'Cubed'}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white p-2 rounded-md border border-yellow-100">
                  <span className="text-lg">🍸</span>
                  <span className="text-yellow-700"><strong>Method:</strong> {currentCocktail.method}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white p-2 rounded-md border border-yellow-100">
                  <span className="text-lg">🍋</span>
                  <span className="text-yellow-700"><strong>Garnish:</strong> {currentCocktail.garnish}</span>
                </div>
              </div>

              {/* Ingredients List */}
              <div className="border-t border-yellow-200 pt-4">
                <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
                  <span className="text-lg mr-2">🧪</span>
                  Ingredients:
                </h4>
                <ul className="text-sm text-yellow-700 space-y-2 bg-white p-3 rounded-md border border-yellow-100">
                  {currentCocktail.ingredients.map((ingredient, index) => {
                    const ingredientData = getIngredientById(ingredient.ingredientId);
                    return (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                        <span>
                          <strong>{ingredient.amount} {ingredient.unit}</strong> {ingredientData?.name || ingredient.ingredientId.replace('-', ' ')}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <Select value={currentCocktail.method}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {METHOD_OPTIONS.map(method => (
                <SelectItem key={method} value={method}>
                  Method: {method.charAt(0).toUpperCase() + method.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={currentCocktail.glass}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GLASS_OPTIONS.map(glass => (
                <SelectItem key={glass} value={glass}>
                  Glass: {glass.charAt(0).toUpperCase() + glass.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => dispatch(toggleRecipe())}
            className="bg-bar-accent hover:bg-orange-600 text-white"
          >
            <Eye className="w-4 h-4 mr-1" />
            {showRecipe ? 'Hide Recipe' : 'Show Recipe'}
          </Button>
        </div>
      </div>
    </div>
  );
}
