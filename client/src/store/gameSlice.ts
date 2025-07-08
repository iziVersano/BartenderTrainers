import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cocktail, SelectedIngredient } from '@shared/schema';

interface GameState {
  currentCocktail: Cocktail | null;
  selectedIngredients: SelectedIngredient[];
  showRecipe: boolean;
  feedback: {
    visible: boolean;
    isCorrect: boolean;
    message: string;
  };
}

const initialState: GameState = {
  currentCocktail: null,
  selectedIngredients: [],
  showRecipe: false,
  feedback: {
    visible: false,
    isCorrect: false,
    message: '',
  },
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentCocktail: (state, action: PayloadAction<Cocktail>) => {
      state.currentCocktail = action.payload;
      state.selectedIngredients = [];
      state.showRecipe = false;
      state.feedback.visible = false;
    },
    addIngredient: (state, action: PayloadAction<string>) => {
      const ingredientId = action.payload;
      const exists = state.selectedIngredients.find(ing => ing.ingredientId === ingredientId);
      if (!exists) {
        state.selectedIngredients.push({
          ingredientId,
          amount: '30 ml', // default amount
        });
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.selectedIngredients = state.selectedIngredients.filter(
        ing => ing.ingredientId !== action.payload
      );
    },
    updateIngredientAmount: (state, action: PayloadAction<{ ingredientId: string; amount: string }>) => {
      const ingredient = state.selectedIngredients.find(ing => ing.ingredientId === action.payload.ingredientId);
      if (ingredient) {
        ingredient.amount = action.payload.amount;
      }
    },
    clearAllIngredients: (state) => {
      state.selectedIngredients = [];
    },
    toggleRecipe: (state) => {
      state.showRecipe = !state.showRecipe;
    },
    setFeedback: (state, action: PayloadAction<{ isCorrect: boolean; message: string }>) => {
      state.feedback = {
        visible: true,
        isCorrect: action.payload.isCorrect,
        message: action.payload.message,
      };
    },
    clearFeedback: (state) => {
      state.feedback.visible = false;
    },
    loadNextCocktail: (state, action: PayloadAction<Cocktail>) => {
      state.currentCocktail = action.payload;
      state.selectedIngredients = [];
      state.showRecipe = false;
      state.feedback.visible = false;
    },
  },
});

export const {
  setCurrentCocktail,
  addIngredient,
  removeIngredient,
  updateIngredientAmount,
  clearAllIngredients,
  toggleRecipe,
  setFeedback,
  clearFeedback,
  loadNextCocktail,
} = gameSlice.actions;

export default gameSlice.reducer;
