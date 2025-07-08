import { Cocktail } from '@shared/schema';
import tequilaSunrise from './tequila_sunrise.json';
import wooWoo from './woo_woo.json';

export const cocktails: Cocktail[] = [
  tequilaSunrise as Cocktail,
  wooWoo as Cocktail,
];

export const getCocktailById = (id: string): Cocktail | undefined => {
  return cocktails.find(cocktail => cocktail.id === id);
};

export const getRandomCocktail = (): Cocktail => {
  const randomIndex = Math.floor(Math.random() * cocktails.length);
  return cocktails[randomIndex];
};
