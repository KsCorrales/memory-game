import { defineStore } from "pinia"
import { GameState } from "@/utils/Types"
import { useSound } from "@/composables/Sound"
const sound = useSound()

export const useGame = defineStore('game', {
  state: (): GameState => ({
    pairedCards: [],
    checkingPairs: false,
    lastFlippedCard: 0,
    moves: 0,
    reset: false,
    checkingPairsTimeMs: 1000
  }),
  getters: {},
  actions: {
    restartGame(): void {
      this.pairedCards = []
      this.checkingPairs = false
      this.lastFlippedCard = 0
      this.moves = 0
      this.reset = true
    },
    addPairedCard(card: number) {
      this.pairedCards.push(card)
    },
    addMove(): void {
      this.moves++
      this.reset = false
    },
    checkPairs() {
      this.checkingPairs = true
      setTimeout(() => {
        this.checkingPairs = false
      }, this.checkingPairsTimeMs)
    }
  },
})