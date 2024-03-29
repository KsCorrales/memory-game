import { defineStore } from "pinia"
import { GameState } from "@/utils/Types"

export const useGame = defineStore('game', {
  state: (): GameState => ({
    pairedCards: [],
    revealing: false,
    lastFlippedCard: 0
  }),
  getters: {},
  actions: {
    restartGame(): void {
      this.pairedCards = []
      this.revealing = false
      this.lastFlippedCard = 0
    },
    addPairedCard(card: number) {
      this.pairedCards.push(card)
    },
    reveal() {
      this.revealing = true
      setTimeout(() => { this.revealing = false }, 1000)
    }
  },
})