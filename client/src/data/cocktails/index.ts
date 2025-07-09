import { Cocktail } from '@shared/schema';
import tequilaSunrise from './tequila_sunrise.json';
import wooWoo from './woo_woo.json';
import ginAndTonic from './gin_and_tonic.json';
import spiritAndMixer from './spirit_and_mixer.json';
import cubaLibre from './cuba_libre.json';
import rustyNail from './rusty_nail.json';
import godfather from './godfather.json';
import bramble from './bramble.json';
import mojito from './mojito.json';
import caipirinha from './caipirinha.json';
import mintJulep from './mint_julep.json';
import ginBasilSmash from './gin_basil_smash.json';
import southside from './southside.json';
import b52 from './b52.json';
import pornstarMartini from './pornstar_martini.json';
import bellini from './bellini.json';
import french75 from './french_75.json';
import lastWord from './last_word.json';
import oldFashioned from './old_fashioned.json';
import elDiablo from './el_diablo.json';
import sexOnTheBeach from './sex_on_the_beach.json';
import cosmopolitan from './cosmopolitan.json';
import daiquiri from './daiquiri.json';
import frenchMartini from './french_martini.json';
import lynchburgLemonade from './lynchburg_lemonade.json';

export const cocktails: Cocktail[] = [
  tequilaSunrise as Cocktail,
  wooWoo as Cocktail,
  ginAndTonic as Cocktail,
  spiritAndMixer as Cocktail,
  cubaLibre as Cocktail,
  rustyNail as Cocktail,
  godfather as Cocktail,
  bramble as Cocktail,
  mojito as Cocktail,
  caipirinha as Cocktail,
  mintJulep as Cocktail,
  ginBasilSmash as Cocktail,
  southside as Cocktail,
  b52 as Cocktail,
  pornstarMartini as Cocktail,
  bellini as Cocktail,
  french75 as Cocktail,
  lastWord as Cocktail,
  oldFashioned as Cocktail,
  elDiablo as Cocktail,
  sexOnTheBeach as Cocktail,
  cosmopolitan as Cocktail,
  daiquiri as Cocktail,
  frenchMartini as Cocktail,
  lynchburgLemonade as Cocktail,
];

export const getCocktailById = (id: string): Cocktail | undefined => {
  return cocktails.find(cocktail => cocktail.id === id);
};

export const getRandomCocktail = (): Cocktail => {
  const randomIndex = Math.floor(Math.random() * cocktails.length);
  return cocktails[randomIndex];
};

export const getRandomCocktailExcluding = (excludeId?: string): Cocktail => {
  const availableCocktails = excludeId ? cocktails.filter(cocktail => cocktail.id !== excludeId) : cocktails;
  const randomIndex = Math.floor(Math.random() * availableCocktails.length);
  return availableCocktails[randomIndex];
};
