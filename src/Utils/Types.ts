export type DifficultyType = 1 | 2 | 3 // only 3 levels

export interface SettingsState {
  difficulty: DifficultyType
  sound: boolean
  name: string
}

export interface GameState {
  pairedCards: number[],
  checkingPairs: boolean,
  lastFlippedCard: number,
  moves: number,
  reset: boolean,
  checkingPairsTimeMs: number
}

export interface LeaderBoardState {
  leaderboard: []
}

export interface LeaderboardRecord {
  moves: number
  time: number
  difficulty: number
  name: string
}