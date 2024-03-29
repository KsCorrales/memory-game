export type DifficultyType = 1 | 2 | 3 // only 3 levels

export interface SettingsState {
  difficulty: DifficultyType;
  sound: boolean;
}

export interface GameState {
  pairedCards: number[],
  checkingPairs: boolean,
  lastFlippedCard: number,
  moves: number,
  reset: boolean,
  checkingPairsTimeMs: number
}