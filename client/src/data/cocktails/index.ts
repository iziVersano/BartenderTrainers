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
import darkAndStormy from './dark_and_stormy.json';
import hemingwayDaiquiri from './hemingway_daiquiri.json';
import whiteLady from './white_lady.json';
import bloodyMary from './bloody_mary.json';
import negroni from './negroni.json';
import boulevardier from './boulevardier.json';
import aperolSpritz from './aperol_spritz.json';
import appleMartini from './apple_martini.json';
import kirRoyal from './kir_royal.json';
import zombie from './zombie.json';
import pinaColada from './pina_colada.json';
import lemonDrop from './lemon_drop.json';
import kamikaze from './kamikaze.json';
import singaporeSling from './singapore_sling.json';
import gimlet from './gimlet.json';
import martinez from './martinez.json';
import sazerac from './sazerac.json';
import dryMartini from './dry_martini.json';
import manhattan from './manhattan.json';
import robRoy from './rob_roy.json';
import horsesNeck from './horses_neck.json';
import tomCollins from './tom_collins.json';
import longIslandIcedTea from './long_island_iced_tea.json';

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
  darkAndStormy as Cocktail,
  hemingwayDaiquiri as Cocktail,
  whiteLady as Cocktail,
  bloodyMary as Cocktail,
  negroni as Cocktail,
  boulevardier as Cocktail,
  aperolSpritz as Cocktail,
  appleMartini as Cocktail,
  kirRoyal as Cocktail,
  zombie as Cocktail,
  pinaColada as Cocktail,
  lemonDrop as Cocktail,
  kamikaze as Cocktail,
  singaporeSling as Cocktail,
  gimlet as Cocktail,
  martinez as Cocktail,
  sazerac as Cocktail,
  dryMartini as Cocktail,
  manhattan as Cocktail,
  robRoy as Cocktail,
  horsesNeck as Cocktail,
  tomCollins as Cocktail,
  longIslandIcedTea as Cocktail,
];

export const getCocktailById = (id: string): Cocktail | undefined => {
  return cocktails.find(cocktail => cocktail.id === id);
};

export const getRandomCocktail = (): Cocktail => {
  const randomIndex = Math.floor(Math.random() * cocktails.length);
  return cocktails[randomIndex];
};

export const getRandomCocktailExcluding = (excludeId?: string | string[]): Cocktail => {
  let availableCocktails = cocktails;
  
  if (excludeId) {
    const excludeIds = Array.isArray(excludeId) ? excludeId : [excludeId];
    availableCocktails = cocktails.filter(cocktail => !excludeIds.includes(cocktail.id));
  }
  
  const randomIndex = Math.floor(Math.random() * availableCocktails.length);
  return availableCocktails[randomIndex];
};

// Shuffle function using Fisher-Yates algorithm
export const shuffleCocktails = (): Cocktail[] => {
  const shuffled = [...cocktails];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
