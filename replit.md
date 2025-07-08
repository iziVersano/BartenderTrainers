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

## Changelog

Changelog:
- July 08, 2025. Initial setup