<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useSettings } from '../store/settings'
import { useLeaderBoardStore } from '@/store/leaderBoard'
import LeaderBoardTable from '../components/LeaderBoardTable.vue'

const settingsStore = useSettings()
const leaderboardStore = useLeaderBoardStore()
const showLeaderBoard = ref(false)

const userName = computed({
  get: () => settingsStore.getName,
  set: (value) => settingsStore.setName(value),
})

onMounted(() => {
  leaderboardStore.loadLocalStorageLeaderboard()
})
</script>
<template>
  <div class="justify-center flex items-center h-screen">
    <div class="relative">
      <div class="justify-center mb-12">
        <h1 class="text-5xl text-yellow-200 font-extrabold text-center">Memory Game</h1>
        <div class="text-center pt-4">
          <input v-model="userName" type="text" class="border-gray-300 border rounded-md py-2 px-4 text-center focus:outline-none focus:border-blue-400" placeholder="Type your name" />
        </div>
      </div>

      <div class="grid grid-cols-1 gap-2">
        <router-link custom :to="{ name: 'game' }" v-slot="{ navigate }">
          <button class="menu-button" @click="navigate">Start</button>
        </router-link>

        <button class="menu-button" @click="settingsStore.addDifficulty">Difficulty: {{ settingsStore.difficultyName }}</button>

        <button class="menu-button" @click="settingsStore.updateSoundSetting">Sound: {{ settingsStore.soundName }}</button>

        <!-- Leaderboard table -->
        <button v-if="leaderboardStore.leaderboard.length" class="menu-button" @click="showLeaderBoard = !showLeaderBoard">{{ showLeaderBoard ? 'Hide' : 'Show' }} LeaderBoard</button>
        <template v-if="showLeaderBoard">
          <LeaderBoardTable :rows="leaderboardStore.leaderboard"></LeaderBoardTable>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-button {
  /* applying Tailwind style classes */
  @apply px-4 py-2 font-semibold text-sm text-white rounded-md shadow-sm transition ease-in-out delay-75 bg-amber-900 hover:bg-amber-700 hover:-translate-y-1 hover:scale-110  duration-300;
}
</style>
