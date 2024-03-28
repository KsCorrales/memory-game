import { defineStore } from "pinia"
import { DifficultyType } from '../utils/Types';

interface SettingsState {
  difficulty: DifficultyType;
  sound: boolean;
}

export const useSettings = defineStore('settings', {
  state: () => ({
    difficulty: 1,
    sound: false
  }),

  getters: {
    soundName: (state) => state.sound ? 'On' : 'Off',
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
      console.log('updating... sound setting')
      this.sound = !this.sound
    },
    addDifficulty() {
      console.log('adding... difficulty setting')
      if (this.difficulty >= 3) {
        this.difficulty = 1
      } else {
        this.difficulty++
      }
    },
  },
})