<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import Card from '../components/Card.vue'
import { useGameInit } from '../composables/GameInit'
import { useDynamicClasses } from '../composables/DynamicClasses'
import { LeaderboardRecord } from '@/utils/Types'
import { useLeaderBoardStore } from '@/store/leaderBoard'

const { cards, gameStore, flippedCard, initGame, stopTimer, formattedTime, settingsStore, timeInSeconds } = useGameInit()
const { gameBoardClasses, gridCardClasses } = useDynamicClasses()
const leaderboardStore = useLeaderBoardStore()

const youWin = computed(() => {
  return cards.value.length === gameStore.pairedCards.length * 2
})

function calculateScore() {
  const minMovesToWin = settingsStore.cardsLength * 2 // min moves to win (every 2 cards flipped are paired cards)

  const minTimeByDifficulty = {
    1: 10,
    2: 30,
    3: 60,
  }

  if (timeInSeconds.value <= minTimeByDifficulty[settingsStore.difficulty] || gameStore.moves === minMovesToWin) {
    // if resolve before 10 seconds
    return 5
  } else if (timeInSeconds.value >= minTimeByDifficulty[settingsStore.difficulty] && gameStore.moves < minMovesToWin * 1.5) {
    // if passes 15 secs but user uses less than 50% more min moves
    return 4
  } else if (timeInSeconds.value > minTimeByDifficulty[settingsStore.difficulty] && gameStore.moves >= minMovesToWin * 1.5) {
    // if passes more than the 50% more of the
    return 3
  } else {
    // nobody deserves 0
    return 1
  }
}

watch(
  () => youWin.value,
  (newVal) => {
    if (newVal) {
      gameOver()
    }
  },
)

function gameOver() {
  stopTimer()
  const record: LeaderboardRecord = {
    moves: gameStore.moves,
    time: timeInSeconds.value,
    difficulty: settingsStore.difficulty,
    name: settingsStore.name,
  }

  console.log('GAME OVER, STORING DATA', record)
  leaderboardStore.addLocalStorageLeaderBoard(record)
}

onMounted(() => {
  initGame()
})
</script>
<template>
  <div class="grid grid-cols-3 p-6">
    <div class="grid grid-cols-4">
      <div class="justify-center mb-12 col-span-3">
        <div class="grid grid-cols-1 gap-2 rounded-xl bg-yellow-200 text-gray-800 p-4 shadow-md">
          <h1 class="text-3xl font-bold mb-4 text-center">Memory Game: {{ settingsStore.difficultyName }}</h1>
          <div class="flex gap-4">
            <div class="flex-1 flex flex-col items-center p-2">
              <span class="text-2xl font-bold">{{ gameStore.moves }}</span>
              <span class="text-xs font-bold uppercase">Moves</span>
            </div>
            <div class="flex-1 flex flex-col items-center p-2">
              <span class="text-2xl font-bold">{{ formattedTime }}</span>
              <span class="text-xs font-bold uppercase">Time</span>
            </div>
            <div class="flex-1 hidden lg:flex flex-col items-center p-2">
              <span class="text-2xl font-bold">{{ gameStore.pairedCards.length }}</span>
              <span class="text-xs font-bold uppercase">Paired Cards</span>
            </div>
          </div>
          <div v-if="youWin" class="bg-gray-300 mt-4 p-2 rounded-lg">
            <div class="flex flex-col items-center">
              <div class="flex items-center text-gray-800 mb-2">
                <template v-for="i in calculateScore()">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-auto">
                    <path
                      fill-rule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </template>
              </div>
              <span class="text-lg font-bold">Rated {{ calculateScore() }} Stars</span>
              <span class="text-xs font-bold uppercase">Thanks for playing!!</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <router-link custom :to="{ name: 'home' }" v-slot="{ navigate }">
              <button class="game-button" @click="navigate">Return to Menu</button>
            </router-link>
            <button class="game-button" @click="initGame">Restart</button>
          </div>
        </div>
      </div>
    </div>

    <div :class="gameBoardClasses">
      <div :class="gridCardClasses">
        <div class="flex justify-center items-center" v-for="(card, cardIndex) in cards" :key="`card-${cardIndex}`">
          <Card :number="card" @flipped-card="flippedCard"></Card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-button {
  @apply px-4 py-2 font-semibold text-sm text-white rounded-md shadow-sm transition ease-in-out delay-75 bg-amber-900 hover:bg-amber-700 duration-300;
}
</style>
