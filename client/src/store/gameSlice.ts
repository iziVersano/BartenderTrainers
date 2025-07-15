import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cocktail, SelectedIngredient } from '@shared/schema';

interface CocktailSession {
  cocktail: Cocktail | null;
  selectedIngredients: SelectedIngredient[];
  showRecipe: boolean;
  feedback: {
    visible: boolean;
    isCorrect: boolean;
    message: string;
  };
}

interface GameState {
  isDualMode: boolean;
  currentCocktail: Cocktail | null;
  selectedIngredients: SelectedIngredient[];
  showRecipe: boolean;
  feedback: {
    visible: boolean;
    isCorrect: boolean;
    message: string;
  };
  // Training sequence state
  trainingSequence: Cocktail[];
  currentTrainingIndex: number;
  trainingComplete: boolean;
  // Dual mode sessions
  cocktailA: CocktailSession;
  cocktailB: CocktailSession;
}

const initialCocktailSession: CocktailSession = {
  cocktail: null,
  selectedIngredients: [],
  showRecipe: false,
  feedback: {
    visible: false,
    isCorrect: false,
    message: '',
  },
};

const initialState: GameState = {
  isDualMode: false,
  currentCocktail: null,
  selectedIngredients: [],
  showRecipe: false,
  feedback: {
    visible: false,
    isCorrect: false,
    message: '',
  },
  trainingSequence: [],
  currentTrainingIndex: 0,
  trainingComplete: false,
  cocktailA: { ...initialCocktailSession },
  cocktailB: { ...initialCocktailSession },
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
    skipCocktail: (state, action: PayloadAction<Cocktail>) => {
      state.currentCocktail = action.payload;
      state.selectedIngredients = [];
      state.showRecipe = false;
      state.feedback.visible = false;
    },
    // Training sequence actions
    initializeTrainingSequence: (state, action: PayloadAction<Cocktail[]>) => {
      state.trainingSequence = action.payload;
      state.currentTrainingIndex = 0;
      state.trainingComplete = false;
      if (action.payload.length > 0) {
        state.currentCocktail = action.payload[0];
        state.selectedIngredients = [];
        state.showRecipe = false;
        state.feedback.visible = false;
      }
    },
    nextTrainingCocktail: (state) => {
      if (state.currentTrainingIndex < state.trainingSequence.length - 1) {
        state.currentTrainingIndex += 1;
        state.currentCocktail = state.trainingSequence[state.currentTrainingIndex];
        state.selectedIngredients = [];
        state.showRecipe = false;
        state.feedback.visible = false;
      } else {
        state.trainingComplete = true;
      }
    },
    restartTraining: (state, action: PayloadAction<Cocktail[]>) => {
      state.trainingSequence = action.payload;
      state.currentTrainingIndex = 0;
      state.trainingComplete = false;
      if (action.payload.length > 0) {
        state.currentCocktail = action.payload[0];
        state.selectedIngredients = [];
        state.showRecipe = false;
        state.feedback.visible = false;
      }
    },
    // Dual mode actions
    toggleDualMode: (state) => {
      state.isDualMode = !state.isDualMode;
    },
    setCocktailA: (state, action: PayloadAction<Cocktail>) => {
      state.cocktailA.cocktail = action.payload;
      state.cocktailA.selectedIngredients = [];
      state.cocktailA.showRecipe = false;
      state.cocktailA.feedback.visible = false;
    },
    setCocktailB: (state, action: PayloadAction<Cocktail>) => {
      state.cocktailB.cocktail = action.payload;
      state.cocktailB.selectedIngredients = [];
      state.cocktailB.showRecipe = false;
      state.cocktailB.feedback.visible = false;
    },
    addIngredientToCocktail: (state, action: PayloadAction<{ cocktail: 'A' | 'B'; ingredientId: string }>) => {
      const { cocktail, ingredientId } = action.payload;
      const session = cocktail === 'A' ? state.cocktailA : state.cocktailB;
      const exists = session.selectedIngredients.find(ing => ing.ingredientId === ingredientId);
      if (!exists) {
        session.selectedIngredients.push({
          ingredientId,
          amount: '30 ml',
        });
      }
    },
    removeIngredientFromCocktail: (state, action: PayloadAction<{ cocktail: 'A' | 'B'; ingredientId: string }>) => {
      const { cocktail, ingredientId } = action.payload;
      const session = cocktail === 'A' ? state.cocktailA : state.cocktailB;
      session.selectedIngredients = session.selectedIngredients.filter(
        ing => ing.ingredientId !== ingredientId
      );
    },
    updateIngredientAmountInCocktail: (state, action: PayloadAction<{ cocktail: 'A' | 'B'; ingredientId: string; amount: string }>) => {
      const { cocktail, ingredientId, amount } = action.payload;
      const session = cocktail === 'A' ? state.cocktailA : state.cocktailB;
      const ingredient = session.selectedIngredients.find(ing => ing.ingredientId === ingredientId);
      if (ingredient) {
        ingredient.amount = amount;
      }
    },
    clearAllIngredientsFromCocktail: (state, action: PayloadAction<'A' | 'B'>) => {
      const session = action.payload === 'A' ? state.cocktailA : state.cocktailB;
      session.selectedIngredients = [];
    },
    toggleRecipeForCocktail: (state, action: PayloadAction<'A' | 'B'>) => {
      const session = action.payload === 'A' ? state.cocktailA : state.cocktailB;
      session.showRecipe = !session.showRecipe;
    },
    setFeedbackForCocktail: (state, action: PayloadAction<{ cocktail: 'A' | 'B'; isCorrect: boolean; message: string }>) => {
      const { cocktail, isCorrect, message } = action.payload;
      const session = cocktail === 'A' ? state.cocktailA : state.cocktailB;
      session.feedback = {
        visible: true,
        isCorrect,
        message,
      };
    },
    clearFeedbackForCocktail: (state, action: PayloadAction<'A' | 'B'>) => {
      const session = action.payload === 'A' ? state.cocktailA : state.cocktailB;
      session.feedback.visible = false;
    },
    skipCocktailInDual: (state, action: PayloadAction<{ cocktail: 'A' | 'B'; newCocktail: Cocktail }>) => {
      const { cocktail, newCocktail } = action.payload;
      const session = cocktail === 'A' ? state.cocktailA : state.cocktailB;
      session.cocktail = newCocktail;
      session.selectedIngredients = [];
      session.showRecipe = false;
      session.feedback.visible = false;
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
  skipCocktail,
  // Training sequence actions
  initializeTrainingSequence,
  nextTrainingCocktail,
  restartTraining,
  // Dual mode actions
  toggleDualMode,
  setCocktailA,
  setCocktailB,
  addIngredientToCocktail,
  removeIngredientFromCocktail,
  updateIngredientAmountInCocktail,
  clearAllIngredientsFromCocktail,
  toggleRecipeForCocktail,
  setFeedbackForCocktail,
  clearFeedbackForCocktail,
  skipCocktailInDual,
} = gameSlice.actions;

export default gameSlice.reducer;
