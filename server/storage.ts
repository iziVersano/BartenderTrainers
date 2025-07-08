import { type GameState } from "@shared/schema";

// Simple storage interface for the bartender training app
export interface IStorage {
  getGameState(): Promise<GameState | undefined>;
  saveGameState(gameState: GameState): Promise<void>;
}

export class MemStorage implements IStorage {
  private gameState: GameState | undefined;

  constructor() {
    this.gameState = undefined;
  }

  async getGameState(): Promise<GameState | undefined> {
    return this.gameState;
  }

  async saveGameState(gameState: GameState): Promise<void> {
    this.gameState = gameState;
  }
}

export const storage = new MemStorage();
