import { z } from "zod";

// Ingredient schema
export const ingredientSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(["spirits", "liqueurs", "juices", "mixers", "garnishes", "syrups", "bitters"]),
  color: z.string(),
  position: z.object({
    section: z.enum(["back-bar", "speed-line", "mixers", "garnish-tray"]),
    row: z.number().optional(),
    col: z.number().optional()
  })
});

// Cocktail ingredient with measurement
export const cocktailIngredientSchema = z.object({
  ingredientId: z.string(),
  amount: z.string(),
  unit: z.string() // Allow any unit string for flexibility
});

// Cocktail schema
export const cocktailSchema = z.object({
  id: z.string(),
  name: z.string(),
  ingredients: z.array(cocktailIngredientSchema),
  method: z.string(), // Allow any method string for flexibility
  glass: z.string(), // Allow any glass string for flexibility
  ice: z.string().optional(), // Add ice field
  garnish: z.string().optional(),
  description: z.string().optional()
});

// Game state schema
export const gameStateSchema = z.object({
  currentCocktail: cocktailSchema,
  selectedIngredients: z.array(z.object({
    ingredientId: z.string(),
    amount: z.string()
  })),
  showRecipe: z.boolean(),
  feedback: z.object({
    visible: z.boolean(),
    isCorrect: z.boolean(),
    message: z.string()
  }).optional()
});

// Type exports
export type Ingredient = z.infer<typeof ingredientSchema>;
export type CocktailIngredient = z.infer<typeof cocktailIngredientSchema>;
export type Cocktail = z.infer<typeof cocktailSchema>;
export type GameState = z.infer<typeof gameStateSchema>;
export type SelectedIngredient = {
  ingredientId: string;
  amount: string;
};
