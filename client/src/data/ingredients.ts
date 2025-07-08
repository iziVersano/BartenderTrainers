import { Ingredient } from '@shared/schema';

export const ingredients: Ingredient[] = [
  // Back Bar - Top Row (Row 0)
  {
    id: 'vodka',
    name: 'Vodka',
    category: 'spirits',
    color: 'from-amber-200 to-amber-400',
    position: { section: 'back-bar', row: 0, col: 0 }
  },
  {
    id: 'gin',
    name: 'Gin',
    category: 'spirits',
    color: 'from-amber-100 to-amber-300',
    position: { section: 'back-bar', row: 0, col: 1 }
  },
  {
    id: 'rum',
    name: 'Rum',
    category: 'spirits',
    color: 'from-amber-300 to-amber-500',
    position: { section: 'back-bar', row: 0, col: 2 }
  },
  {
    id: 'tequila',
    name: 'Tequila',
    category: 'spirits',
    color: 'from-amber-400 to-amber-600',
    position: { section: 'back-bar', row: 0, col: 3 }
  },
  {
    id: 'whiskey',
    name: 'Whiskey',
    category: 'spirits',
    color: 'from-amber-500 to-amber-700',
    position: { section: 'back-bar', row: 0, col: 4 }
  },
  {
    id: 'brandy',
    name: 'Brandy',
    category: 'spirits',
    color: 'from-purple-200 to-purple-400',
    position: { section: 'back-bar', row: 0, col: 5 }
  },
  {
    id: 'absinthe',
    name: 'Absinthe',
    category: 'spirits',
    color: 'from-green-200 to-green-400',
    position: { section: 'back-bar', row: 0, col: 6 }
  },
  {
    id: 'campari',
    name: 'Campari',
    category: 'liqueurs',
    color: 'from-red-200 to-red-400',
    position: { section: 'back-bar', row: 0, col: 7 }
  },
  {
    id: 'aperol',
    name: 'Aperol',
    category: 'liqueurs',
    color: 'from-orange-200 to-orange-400',
    position: { section: 'back-bar', row: 0, col: 8 }
  },
  {
    id: 'chartreuse',
    name: 'Chartreuse',
    category: 'liqueurs',
    color: 'from-yellow-200 to-yellow-400',
    position: { section: 'back-bar', row: 0, col: 9 }
  },
  {
    id: 'curacao',
    name: 'Curaçao',
    category: 'liqueurs',
    color: 'from-blue-200 to-blue-400',
    position: { section: 'back-bar', row: 0, col: 10 }
  },
  {
    id: 'benedictine',
    name: 'Bénédictine',
    category: 'liqueurs',
    color: 'from-indigo-200 to-indigo-400',
    position: { section: 'back-bar', row: 0, col: 11 }
  },

  // Back Bar - Middle Row (Row 1)
  {
    id: 'kahlua',
    name: 'Kahlúa',
    category: 'liqueurs',
    color: 'from-brown-200 to-brown-400',
    position: { section: 'back-bar', row: 1, col: 0 }
  },
  {
    id: 'baileys',
    name: 'Baileys',
    category: 'liqueurs',
    color: 'from-green-300 to-green-500',
    position: { section: 'back-bar', row: 1, col: 1 }
  },
  {
    id: 'amaretto',
    name: 'Amaretto',
    category: 'liqueurs',
    color: 'from-pink-200 to-pink-400',
    position: { section: 'back-bar', row: 1, col: 2 }
  },
  {
    id: 'sambuca',
    name: 'Sambuca',
    category: 'liqueurs',
    color: 'from-gray-200 to-gray-400',
    position: { section: 'back-bar', row: 1, col: 3 }
  },
  {
    id: 'chambord',
    name: 'Chambord',
    category: 'liqueurs',
    color: 'from-purple-300 to-purple-500',
    position: { section: 'back-bar', row: 1, col: 4 }
  },
  {
    id: 'grenadine',
    name: 'Grenadine',
    category: 'syrups',
    color: 'from-red-300 to-red-500',
    position: { section: 'back-bar', row: 1, col: 5 }
  },
  {
    id: 'blue-curacao',
    name: 'Blue Curaçao',
    category: 'liqueurs',
    color: 'from-blue-300 to-blue-500',
    position: { section: 'back-bar', row: 1, col: 6 }
  },
  {
    id: 'cointreau',
    name: 'Cointreau',
    category: 'liqueurs',
    color: 'from-yellow-300 to-yellow-500',
    position: { section: 'back-bar', row: 1, col: 7 }
  },
  {
    id: 'grand-marnier',
    name: 'Grand Marnier',
    category: 'liqueurs',
    color: 'from-orange-300 to-orange-500',
    position: { section: 'back-bar', row: 1, col: 8 }
  },
  {
    id: 'midori',
    name: 'Midori',
    category: 'liqueurs',
    color: 'from-green-400 to-green-600',
    position: { section: 'back-bar', row: 1, col: 9 }
  },
  {
    id: 'peach-schnapps',
    name: 'Peach Schnapps',
    category: 'liqueurs',
    color: 'from-teal-300 to-teal-500',
    position: { section: 'back-bar', row: 1, col: 10 }
  },
  {
    id: 'triple-sec',
    name: 'Triple Sec',
    category: 'liqueurs',
    color: 'from-rose-300 to-rose-500',
    position: { section: 'back-bar', row: 1, col: 11 }
  },

  // Back Bar - Bottom Row (Row 2)
  {
    id: 'vermouth-dry',
    name: 'Dry Vermouth',
    category: 'liqueurs',
    color: 'from-gray-300 to-gray-500',
    position: { section: 'back-bar', row: 2, col: 0 }
  },
  {
    id: 'vermouth-sweet',
    name: 'Sweet Vermouth',
    category: 'liqueurs',
    color: 'from-red-400 to-red-600',
    position: { section: 'back-bar', row: 2, col: 1 }
  },
  {
    id: 'angostura',
    name: 'Angostura',
    category: 'bitters',
    color: 'from-amber-600 to-amber-800',
    position: { section: 'back-bar', row: 2, col: 2 }
  },
  {
    id: 'worcestershire',
    name: 'Worcestershire',
    category: 'bitters',
    color: 'from-green-500 to-green-700',
    position: { section: 'back-bar', row: 2, col: 3 }
  },
  {
    id: 'tabasco',
    name: 'Tabasco',
    category: 'bitters',
    color: 'from-red-500 to-red-700',
    position: { section: 'back-bar', row: 2, col: 4 }
  },
  {
    id: 'rose-water',
    name: 'Rose Water',
    category: 'bitters',
    color: 'from-orange-500 to-orange-700',
    position: { section: 'back-bar', row: 2, col: 5 }
  },
  {
    id: 'vanilla-extract',
    name: 'Vanilla Extract',
    category: 'bitters',
    color: 'from-yellow-500 to-yellow-700',
    position: { section: 'back-bar', row: 2, col: 6 }
  },
  {
    id: 'bitters',
    name: 'Bitters',
    category: 'bitters',
    color: 'from-brown-400 to-brown-600',
    position: { section: 'back-bar', row: 2, col: 7 }
  },
  {
    id: 'lavender',
    name: 'Lavender',
    category: 'bitters',
    color: 'from-purple-400 to-purple-600',
    position: { section: 'back-bar', row: 2, col: 8 }
  },
  {
    id: 'elderflower',
    name: 'Elderflower',
    category: 'bitters',
    color: 'from-pink-400 to-pink-600',
    position: { section: 'back-bar', row: 2, col: 9 }
  },
  {
    id: 'simple-syrup',
    name: 'Simple Syrup',
    category: 'syrups',
    color: 'from-indigo-400 to-indigo-600',
    position: { section: 'back-bar', row: 2, col: 10 }
  },
  {
    id: 'honey',
    name: 'Honey',
    category: 'syrups',
    color: 'from-teal-400 to-teal-600',
    position: { section: 'back-bar', row: 2, col: 11 }
  },

  // Speed Line
  {
    id: 'orange-juice',
    name: 'Orange Juice',
    category: 'juices',
    color: 'from-orange-300 to-orange-500',
    position: { section: 'speed-line' }
  },
  {
    id: 'cranberry-juice',
    name: 'Cranberry Juice',
    category: 'juices',
    color: 'from-red-300 to-red-500',
    position: { section: 'speed-line' }
  },
  {
    id: 'pineapple-juice',
    name: 'Pineapple Juice',
    category: 'juices',
    color: 'from-yellow-300 to-yellow-500',
    position: { section: 'speed-line' }
  },
  {
    id: 'lime-juice',
    name: 'Lime Juice',
    category: 'juices',
    color: 'from-green-300 to-green-500',
    position: { section: 'speed-line' }
  },
  {
    id: 'lemon-juice',
    name: 'Lemon Juice',
    category: 'juices',
    color: 'from-yellow-400 to-yellow-600',
    position: { section: 'speed-line' }
  },
  {
    id: 'grapefruit-juice',
    name: 'Grapefruit Juice',
    category: 'juices',
    color: 'from-pink-300 to-pink-500',
    position: { section: 'speed-line' }
  },

  // Mixers
  {
    id: 'soda-water',
    name: 'Soda Water',
    category: 'mixers',
    color: 'from-blue-200 to-blue-400',
    position: { section: 'mixers' }
  },
  {
    id: 'tonic-water',
    name: 'Tonic Water',
    category: 'mixers',
    color: 'from-yellow-200 to-yellow-400',
    position: { section: 'mixers' }
  },
  {
    id: 'cola',
    name: 'Cola',
    category: 'mixers',
    color: 'from-brown-200 to-brown-400',
    position: { section: 'mixers' }
  },
  {
    id: 'ginger-beer',
    name: 'Ginger Beer',
    category: 'mixers',
    color: 'from-green-200 to-green-400',
    position: { section: 'mixers' }
  },
  {
    id: 'energy-drink',
    name: 'Energy Drink',
    category: 'mixers',
    color: 'from-purple-200 to-purple-400',
    position: { section: 'mixers' }
  },
  {
    id: 'milk',
    name: 'Milk',
    category: 'mixers',
    color: 'from-gray-200 to-gray-400',
    position: { section: 'mixers' }
  },

  // Garnish Tray
  {
    id: 'lime-wheel',
    name: 'Lime Wheel',
    category: 'garnishes',
    color: 'from-green-400 to-green-600',
    position: { section: 'garnish-tray' }
  },
  {
    id: 'lemon-wheel',
    name: 'Lemon Wheel',
    category: 'garnishes',
    color: 'from-yellow-400 to-yellow-600',
    position: { section: 'garnish-tray' }
  },
  {
    id: 'cherry',
    name: 'Cherry',
    category: 'garnishes',
    color: 'from-red-400 to-red-600',
    position: { section: 'garnish-tray' }
  },
  {
    id: 'olives',
    name: 'Olives',
    category: 'garnishes',
    color: 'from-green-500 to-green-700',
    position: { section: 'garnish-tray' }
  },
  {
    id: 'orange-peel',
    name: 'Orange Peel',
    category: 'garnishes',
    color: 'from-orange-400 to-orange-600',
    position: { section: 'garnish-tray' }
  },
  {
    id: 'salt-rim',
    name: 'Salt Rim',
    category: 'garnishes',
    color: 'from-white to-gray-200',
    position: { section: 'garnish-tray' }
  }
];

// Helper functions
export const getIngredientById = (id: string): Ingredient | undefined => {
  return ingredients.find(ingredient => ingredient.id === id);
};

export const getIngredientsBySection = (section: string): Ingredient[] => {
  return ingredients.filter(ingredient => ingredient.position.section === section);
};

export const getBackBarIngredients = (): Ingredient[][] => {
  const backBarIngredients = ingredients.filter(ing => ing.position.section === 'back-bar');
  const rows: Ingredient[][] = [[], [], []];
  
  backBarIngredients.forEach(ing => {
    if (ing.position.row !== undefined) {
      rows[ing.position.row].push(ing);
    }
  });
  
  // Sort each row by column
  rows.forEach(row => {
    row.sort((a, b) => (a.position.col || 0) - (b.position.col || 0));
  });
  
  return rows;
};
