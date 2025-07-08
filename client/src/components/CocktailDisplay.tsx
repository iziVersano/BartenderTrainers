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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800">{currentCocktail.name}</h2>
          <p className="text-sm text-gray-600">Build this cocktail using the station below</p>
        </div>
        
        {/* Controls when recipe is hidden */}
        {!showRecipe && (
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 lg:flex-shrink-0">
            <Select value={currentCocktail.method}>
              <SelectTrigger className="w-full sm:w-36 bg-yellow-50 border-yellow-200 text-yellow-700">
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
              <SelectTrigger className="w-full sm:w-36 bg-yellow-50 border-yellow-200 text-yellow-700">
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
              className="bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-400 shadow-sm"
            >
              <Eye className="w-4 h-4 mr-1" />
              Show Recipe
            </Button>
          </div>
        )}
      </div>

      {/* Recipe display when visible */}
      {showRecipe && (
        <div className="mt-4">
          <div className="space-y-4">
            {/* Recipe Details Card */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 shadow-sm">
              <h3 className="font-semibold text-yellow-800 mb-4 text-base flex items-center">
                <span className="text-lg mr-2">📝</span>
                Recipe Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2 bg-white p-3 rounded-md border border-yellow-100 shadow-sm">
                  <span className="text-lg">🥃</span>
                  <span className="text-yellow-700"><strong>Glass:</strong> {currentCocktail.glass}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-md border border-yellow-100 shadow-sm">
                  <span className="text-lg">❄️</span>
                  <span className="text-yellow-700"><strong>Ice:</strong> {currentCocktail.ice || 'Cubed'}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-md border border-yellow-100 shadow-sm">
                  <span className="text-lg">🍸</span>
                  <span className="text-yellow-700"><strong>Method:</strong> {currentCocktail.method}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-md border border-yellow-100 shadow-sm">
                  <span className="text-lg">🍋</span>
                  <span className="text-yellow-700"><strong>Garnish:</strong> {currentCocktail.garnish}</span>
                </div>
              </div>
            </div>

            {/* Ingredients Card */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 shadow-sm">
              <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
                <span className="text-lg mr-2">🧪</span>
                Ingredients
              </h4>
              <ul className="text-sm space-y-2">
                {currentCocktail.ingredients.map((ingredient, index) => {
                  const ingredientData = getIngredientById(ingredient.ingredientId);
                  return (
                    <li key={index} className="flex items-center space-x-3 bg-white p-3 rounded-md border border-yellow-100 shadow-sm">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></span>
                      <span className="text-yellow-700">
                        <strong className="text-yellow-800">{ingredient.amount} {ingredient.unit}</strong> {ingredientData?.name || ingredient.ingredientId.replace('-', ' ')}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Description Card (if available) */}
            {currentCocktail.description && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 shadow-sm">
                <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
                  <span className="text-lg mr-2">📖</span>
                  Description
                </h4>
                <p className="text-sm text-yellow-700 bg-white p-3 rounded-md border border-yellow-100 shadow-sm">
                  {currentCocktail.description}
                </p>
              </div>
            )}
          </div>
          
          {/* Hide Recipe Button */}
          <div className="flex justify-end mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => dispatch(toggleRecipe())}
              className="bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-400 shadow-sm"
            >
              <Eye className="w-4 h-4 mr-1" />
              Hide Recipe
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
