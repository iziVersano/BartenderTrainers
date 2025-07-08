export * from '@shared/schema';

export interface IngredientPosition {
  section: 'back-bar' | 'speed-line' | 'mixers' | 'garnish-tray';
  row?: number;
  col?: number;
}

export interface BarSection {
  id: string;
  name: string;
  ingredients: string[];
}

export const AMOUNT_OPTIONS = [
  '0.5 oz',
  '1 oz',
  '1.5 oz',
  '2 oz',
  '3 oz',
  '4 oz',
  '6 oz',
  'Splash',
  'Dash',
  'Top off',
  'Rim'
];

export const METHOD_OPTIONS = [
  'build',
  'shake',
  'stir',
  'blend',
  'layer'
];

export const GLASS_OPTIONS = [
  'highball',
  'rocks',
  'martini',
  'shot',
  'coupe',
  'flute',
  'wine'
];
