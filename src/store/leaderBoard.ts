import { defineStore } from "pinia"
import { LeaderboardRecord, LeaderBoardState } from '@/utils/Types'

export const useLeaderBoardStore = defineStore('leaderboard', {
  state: (): LeaderBoardState => ({
    leaderboard: []
  }),
  actions: {

    loadLocalStorageLeaderboard() {
      const leaderboardJSON = localStorage.getItem('leaderboard')
      if (leaderboardJSON) {
        this.leaderboard = JSON.parse(leaderboardJSON)
      }
    },

    saveLocalStorageLeaderBoard(leaderBoardData: Object[]) {
      localStorage.setItem('leaderboard', JSON.stringify(leaderBoardData))
    },

    addLocalStorageLeaderBoard(record: LeaderboardRecord) {
      let draft: LeaderboardRecord[] = this.leaderboard || []
      draft.push(record)
      draft.sort((a, b) => {
        if (a.difficulty !== b.difficulty) return a.difficulty - b.difficulty
        if (a.time !== b.time) return a.time - b.time
        return a.moves - b.moves
      })
      this.saveLocalStorageLeaderBoard(draft)
    }
  },
})