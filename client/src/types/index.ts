export * from '../../../shared/schema';

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
  '10 ml',
  '15 ml',
  '20 ml',
  '30 ml',
  '40 ml',
  '50 ml',
  '60 ml',
  'Fill',
  'Fill equal parts',
  'Splash',
  'Dash',
  'Sink'
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
