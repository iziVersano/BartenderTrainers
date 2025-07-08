import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleRecipe } from '@/store/gameSlice';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye } from 'lucide-react';
import { METHOD_OPTIONS, GLASS_OPTIONS } from '@/types';

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
            <div className="mt-2 p-3 bg-gray-50 rounded-md">
              <h3 className="font-medium text-gray-700 mb-2">Recipe:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {currentCocktail.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.amount} {ingredient.unit} {ingredient.ingredientId.replace('-', ' ')}
                  </li>
                ))}
              </ul>
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
