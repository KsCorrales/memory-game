export type DifficultyType = 1 | 2 | 3 // only 3 levels

export interface SettingsState {
  difficulty: DifficultyType;
  sound: boolean;
}

export interface GameState {
  pairedCards: number[],
  revealing: boolean,
  lastFlippedCard: number
}