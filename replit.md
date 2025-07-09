# Bar Station Trainer

## Overview

The Bar Station Trainer is a full-stack cocktail training application that simulates a realistic bar environment. It allows users to practice making cocktails by selecting ingredients from different bar sections and provides feedback on their selections. The application features a React frontend with a Node.js/Express backend, using PostgreSQL for data persistence.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit for global state management
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite for development and production builds
- **Data Fetching**: TanStack Query for server state management

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: In-memory storage (MemStorage class)
- **API Structure**: RESTful endpoints with `/api` prefix

### Key Design Decisions
- **Monorepo Structure**: Shared schema between client and server using TypeScript
- **Component-Based UI**: Modular React components for bar sections and game elements
- **Game State Management**: Redux for complex game state with ingredients and feedback
- **Responsive Design**: Tailwind CSS for mobile-first responsive design

## Key Components

### Frontend Components
1. **BarStation**: Main container showing the bar layout with back bar and front bar sections
2. **BackBar**: Top shelf spirits organized in rows with visual bottle representations
3. **FrontBar**: Speed line, mixers, and garnish sections for quick access ingredients
4. **BuildArea**: Ingredient selection and cocktail building interface
5. **CocktailDisplay**: Shows current cocktail challenge with recipe toggle
6. **FeedbackArea**: Provides success/failure feedback with detailed messages

### Backend Components
1. **Storage Interface**: Abstraction layer for data operations (currently in-memory)
2. **Route Handler**: Express route registration system
3. **Vite Integration**: Development server with hot module replacement

### Shared Components
1. **Schema Definitions**: Zod schemas for ingredients, cocktails, and game state
2. **Type Exports**: Shared TypeScript interfaces

## Data Flow

### Game Flow
1. User loads the application → Random cocktail is selected
2. User clicks ingredients from bar sections → Ingredients added to build area
3. User can modify amounts and remove ingredients
4. User submits cocktail → Validation against correct recipe
5. Feedback displayed → User can try again or get new challenge

### State Management
- **Redux Store**: Manages current cocktail, selected ingredients, and feedback state
- **Local Component State**: Handles UI interactions and form inputs
- **Server State**: TanStack Query manages API calls and caching

### Data Persistence
- **Development**: In-memory storage for rapid prototyping
- **Production Ready**: Drizzle ORM with PostgreSQL schema defined

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React with TypeScript support
- **State Management**: Redux Toolkit + React Redux
- **Styling**: Tailwind CSS + shadcn/ui component library
- **Data Fetching**: TanStack Query for server state
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React icon library

### Backend Dependencies
- **Server**: Express.js with TypeScript
- **Database**: Drizzle ORM with Neon PostgreSQL driver
- **Development**: tsx for TypeScript execution
- **Build**: esbuild for production bundling

### Development Tools
- **Build System**: Vite with React plugin
- **TypeScript**: Full type safety across the stack
- **Linting**: ESLint configuration
- **Development**: Hot reload and error overlay

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app to static files
2. **Backend Build**: esbuild bundles server code with external dependencies
3. **Database Migration**: Drizzle kit handles schema migrations

### Environment Configuration
- **Development**: `NODE_ENV=development` with local database
- **Production**: `NODE_ENV=production` with DATABASE_URL configuration
- **Database**: PostgreSQL connection via environment variables

### Deployment Commands
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build for both client and server
- `npm run start`: Production server startup
- `npm run db:push`: Database schema synchronization

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

- July 08, 2025: Improved recipe visibility UI layout for better user experience
  - Hide method and glass dropdowns when recipe is visible to reduce clutter
  - Repositioned "Hide Recipe" button to bottom right corner of recipe panel
  - Separated recipe display and controls into distinct sections
  - Added proper spacing and alignment with mt-4 margin and flex justify-end
  - Improved visual hierarchy with cleaner state management between show/hide modes
  - Enhanced responsive behavior across all device sizes

- July 08, 2025: Extended yellow card styling for cohesive UI across all recipe sections
  - Applied consistent yellow card styling to Recipe Details, Ingredients, and Description sections
  - Enhanced responsive layout with proper mobile/tablet/desktop breakpoints
  - Updated dropdowns and buttons with yellow theme for visual consistency
  - Added individual cards for each ingredient with proper spacing and shadows
  - Improved section organization with separated cards for better readability
  - Maintained balanced layout across all device sizes with responsive grid system

- July 08, 2025: Improved recipe display visual design for better clarity
  - Added distinctive yellow-themed background (bg-yellow-50) with border
  - Enhanced parameter cards with white backgrounds and subtle borders
  - Added visual bullet points for ingredient list items
  - Improved typography with better color contrast and spacing
  - Added icons for section headers (📝 Recipe Details, 🧪 Ingredients)
  - Made recipe section stand out clearly from rest of page layout

- July 08, 2025: Enhanced cocktail recipe display with complete parameters
  - Added glass type display with 🥃 icon (Highball, Rocks, etc.)
  - Added ice specification with ❄️ icon (Cubed or specified type)
  - Added method display with 🍸 icon (Build, Shake, Build & Sink, etc.)
  - Added garnish display with 🍋 icon (Lime Wedge, None, etc.)
  - Updated schema to include ice field and flexible string types
  - Organized recipe display with visual grid layout and ingredient section

- July 08, 2025: Updated cocktail recipes to official EBS specifications
  - Woo Woo: Vodka 40ml, Peach Liqueur 20ml, Cranberry Juice (Fill)
  - Tequila Sunrise: Tequila 40ml, Orange Juice (Fill), Grenadine 10ml (Sink)
  - Added proper method descriptions (Build, Build & Sink)
  - Updated glass types, ice specifications, and garnish details
  - Standardized JSON structure with accurate EBS measurements

- July 08, 2025: Enhanced ingredient matching with flexible fuzzy logic
  - Replaced strict equality with inclusion-based matching using isMatch() function
  - "Amaretto" now matches "Amaretto Liqueur" and vice versa
  - Improved validation compares ingredient names instead of IDs
  - Better error messages show actual ingredient names in feedback
  - More forgiving system allows natural ingredient variations

- July 08, 2025: Implemented automatic cocktail progression system
  - After successful cocktail submission, system automatically loads new random cocktail
  - 2-second delay shows success message before switching to next challenge
  - Prevents loading the same cocktail twice in a row
  - Added getRandomCocktailExcluding() helper function
  - New loadNextCocktail() Redux action for seamless transitions

- July 08, 2025: Added 5 new cocktail recipes for student practice
  - Gin & Tonic (Gin + Tonic Water + Lime Wedges)
  - Spirit & Mixer (Vodka + Tonic Water + Garnish options)
  - Cuba Libre (Light Rum + Fresh Lime Juice + Cola + Lime Wedges)
  - Rusty Nail (Grant's Scotch Whisky + Drambuie + Lemon Zest)
  - Godfather (Grant's Scotch Whisky + Amaretto)
  - Added missing ingredients: Grant's Scotch Whisky, Drambuie, Cola
  - Updated cocktail loader to include all 7 recipes for random selection

- July 08, 2025: Added 6 additional cocktail recipes for expanded practice
  - Bramble (Gin + Lemon Juice + Sugar Syrup + Crème de Mure)
  - Mojito (Lime Wedges + Sugar Syrup + Mint Leaves + Light Rum + Soda Water)
  - Caipirinha (Lime Wedges + Sugar Syrup + Cachaça)
  - Mint Julep (Angostura Bitters + Mint Leaves + Bourbon)
  - Gin Basil Smash (Basil Leaves + Lemon Juice + Sugar Syrup + Gin)
  - Southside (Mint Leaves + Gin + Sugar Syrup + Lime Juice)
  - Added missing ingredients: Angostura Bitters, Mint Leaves, Basil Leaves
  - Fixed duplicate ingredient entries for better performance
  - Updated cocktail loader to include all 13 recipes for random selection

- July 08, 2025: Enhanced Bar Station layout and UI for improved usability
  - Improved responsive layout with 70% bar station and 30% build area proportions
  - Added responsive breakpoints for mobile/tablet with stacked layout
  - Enhanced Back Bar button styling with better color contrast and readability
  - Updated dark ingredients (Angostura Bitters, Coffee Liqueur, Dark Crème de Cacao) with brighter colors
  - Improved text handling with proper word wrapping and padding for long ingredient names
  - Enhanced button heights and spacing for better touch targets on mobile devices
  - Updated custom Tailwind width classes (7/10, 3/10) for precise layout control

- July 08, 2025: Fixed button text overflow issues across all bar sections
  - Implemented proper text wrapping with white-space: normal and word-wrap: break-word
  - Added dynamic text sizing based on ingredient name length (smaller for >15 characters)
  - Applied consistent 4px 6px padding and line-height: 1.2 for better text display
  - Changed button heights to min-height for flexible vertical expansion
  - Added CSS styling for overflow-wrap and hyphens for better text breaking
  - Fixed display issues for long names like "White Crème de Cacao" and "Grant's Scotch Whisky"

- July 08, 2025: Added 6 new cocktail recipes from batch addition
  - B52 (Coffee Liqueur + Baileys + Triple Sec layered shot)
  - Pornstar Martini (Passionfruit Liqueur + Vodka + Passion Fruit Purée + Lime + Vanilla Syrup + Champagne side)
  - Bellini (Peach Purée + Peach Liqueur + Prosecco)
  - French 75 (Gin + Lemon Juice + Sugar Syrup + Champagne)
  - Last Word (Gin + Green Chartreuse + Maraschino + Lime Juice)
  - Old Fashioned (Bourbon + Sugar Syrup + Angostura Bitters + Orange Zest)
  - Added missing ingredients: Passionfruit Liqueur, Passion Fruit Purée, Vanilla Syrup, Brut Champagne, Peach Purée, Maraschino, Green Chartreuse, Cherry, Orange Zest
  - Expanded cocktail library to 19 total recipes for random selection
  - Cleaned up duplicate ingredient entries to fix React key warnings
  - Fixed runtime error by correcting cocktail JSON structure to match schema

- July 08, 2025: Added Skip Cocktail functionality for improved user experience
  - Added "Skip Cocktail" button (⏭️) in BuildArea header for better visibility
  - Implemented skipCocktail Redux action to load new random cocktail
  - Button clears current build area and loads completely new random cocktail
  - Orange-themed styling to distinguish from other action buttons
  - Positioned in top-right corner of BuildArea header for easy access
  - Users can now skip difficult cocktails and continue practicing with others

- July 08, 2025: Enhanced ingredient matching for better user experience
  - Improved isMatch function to handle spacing variations (e.g., "Passionfruit" vs "Passion fruit")
  - Added normalization that removes spaces and converts to lowercase
  - Added specific variation mappings for common ingredient name differences
  - Enhanced matching handles accented characters (e.g., "purée" vs "puree")
  - More forgiving validation system reduces false negatives in cocktail submissions

- July 09, 2025: Redesigned right panel for intuitive, no-scroll cocktail training
  - Compact cocktail info section with large bold name and 2x2 grid dropdowns
  - Ice and garnish info displayed in compact gray boxes
  - Show/Hide Recipe toggle positioned right-aligned
  - Recipe display condensed to essential ingredients only
  - Smart flexbox layout ensures Submit Cocktail always visible without scrolling
  - Reduced component sizes and spacing for optimal vertical space usage
  - Action buttons fixed at bottom with proper flex-shrink behavior

- July 09, 2025: Major layout restructure for improved user experience
  - Moved Suggested Cocktail section to right panel (1/3 width) within BuildArea
  - Expanded left panel to 2/3 width for better bar station visibility
  - CocktailDisplay now appears at top of right panel above Build Area
  - All buttons (Show Recipe, Skip Cocktail, Submit) remain on right side
  - Enhanced responsive design with proper width distribution
  - Bar stations now have full height and more space for ingredient rows

- July 09, 2025: Added 6 new cocktail recipes expanding the training library
  - El Diablo (Tequila + Crème de Cassis + Fresh Lime Juice + Ginger Ale)
  - Sex on the Beach (Peach Liqueur + Vodka + Cranberry + Orange Juice)
  - Cosmopolitan (Citron Vodka + Triple Sec + Lime Juice + Cranberry Juice)
  - Daiquiri (Light Rum + Lime Juice + Sugar Syrup)
  - French Martini (Vodka + Chambord + Pineapple Juice)
  - Lynchburg Lemonade (Jack Daniel's + Triple Sec + Lemon Juice + Sugar Syrup + Sprite/Lemonade)
  - Added missing ingredients: Ginger Beer, Sprite/Lemonade, Raspberry garnish
  - Expanded cocktail library from 19 to 25 total recipes for random selection
  - All cocktails follow proper EBS specifications with correct measurements and methods
  - Fixed El Diablo recipe to include missing Fresh Lime Juice (20ml)
  - Corrected El Diablo to use Ginger Ale instead of Ginger Beer

- July 09, 2025: Improved BuildArea layout for better usability
  - Implemented sticky Submit Cocktail button fixed to bottom of screen
  - Added sticky positioning with z-index 10 for proper layering
  - Included border-top and background styling for visual separation
  - Added padding-bottom to ingredients section to prevent overlap
  - Enhanced responsive design works on both desktop and mobile views
  - Buttons now always visible and accessible without scrolling

- July 08, 2025: Updated Speed Line with comprehensive 2-row layout
  - Row 0: 14 ingredients (Milk, Juices, Syrups) - Milk → Fresh Lemon Juice
  - Row 1: 13 ingredients (Garnishes, Purées, Spirits) - Mint/Basil → Vodka  
  - Removed duplicate ingredients from Mixers section
  - Updated UI styling with improved text wrapping and spacing
  - Dynamic grid layout adapts to row content length

- July 08, 2025: Updated Bar Station to match official European Bartender School (EBS) layout
  - Replaced back bar ingredients with authentic EBS 3-row layout
  - Row 0: Base spirits (Citron Vodka, Hendrick's, Patron Silver, etc.)
  - Row 1: Liqueurs (Baileys, Amaretto, Coffee Liqueur, etc.)
  - Row 2: Wines & Bitters (Aperol, Campari, Bénédictine DOM, etc.)
  - Updated measurements from oz to ml (10ml-60ml, Fill, Splash, Dash, Sink)
  - Fixed Back Bar text alignment and spacing
  - Updated cocktail recipes to use new ingredient IDs and ml measurements

## Changelog

- July 08, 2025: Initial setup and EBS layout implementation