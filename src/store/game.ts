import { defineStore } from "pinia"

interface GameState {
  pairedCards: number[],
  revealing: boolean,
  lastFlippedCard: number
}

export const useGame = defineStore('game', {
  state: (): GameState => ({
    pairedCards: [],
    revealing: false,
    lastFlippedCard: 0
  }),

  getters: {
  },
  actions: {
    addPairedCard(card: number) {
      this.pairedCards.push(card)
    },
    reveal() {
      this.revealing = true
      setTimeout(() => { this.revealing = false }, 1000)
    }
  },
})