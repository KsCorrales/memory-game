import { defineStore } from "pinia"
import { SettingsState } from "../utils/Types";

export const useSettings = defineStore('settings', {
  state: (): SettingsState => ({
    difficulty: 1,
    sound: false
  }),

  getters: {
    soundName: (state) => state.sound ? 'On' : 'Off',
    cardsLength: (state) => {
      switch (state.difficulty) {
        case 1:
          return 3 * 3
        case 2:
          return 4 * 4
        case 3:
          return 5 * 5
        default:
          return 3 * 3
      }
    },
    difficultyName: (state) => {
      switch (state.difficulty) {
        case 1:
          return 'Easy'
        case 2:
          return 'Medium'
        case 3:
          return 'Hard'
        default:
          return 'Unknown'
      }
    }
  },
  actions: {
    updateSoundSetting() {
      this.sound = !this.sound
    },
    addDifficulty() {
      if (this.difficulty >= 3) {
        this.difficulty = 1
      } else {
        this.difficulty++
      }
    },
  },
})