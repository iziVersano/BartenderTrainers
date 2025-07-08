import { Cocktail } from '@shared/schema';
import tequilaSunrise from './tequila_sunrise.json';
import wooWoo from './woo_woo.json';
import ginAndTonic from './gin_and_tonic.json';
import spiritAndMixer from './spirit_and_mixer.json';
import cubaLibre from './cuba_libre.json';
import rustyNail from './rusty_nail.json';
import godfather from './godfather.json';

export const cocktails: Cocktail[] = [
  tequilaSunrise as Cocktail,
  wooWoo as Cocktail,
  ginAndTonic as Cocktail,
  spiritAndMixer as Cocktail,
  cubaLibre as Cocktail,
  rustyNail as Cocktail,
  godfather as Cocktail,
];

export const getCocktailById = (id: string): Cocktail | undefined => {
  return cocktails.find(cocktail => cocktail.id === id);
};

export const getRandomCocktail = (): Cocktail => {
  const randomIndex = Math.floor(Math.random() * cocktails.length);
  return cocktails[randomIndex];
};
