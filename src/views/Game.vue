<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import Card from '../components/Card.vue'
import ScoreBoard from '../components/ScoreBoard.vue'
import { useGameInit } from '../composables/GameInit'
import { useDynamicClasses } from '../composables/DynamicClasses'
import { LeaderboardRecord } from '@/utils/Types'
import { useLeaderBoardStore } from '@/store/leaderBoard'

const { cards, formattedTime, gameStore, flippedCard, initGame, stopTimer, settingsStore, timeInSeconds } = useGameInit()
const { gameBoardClasses, gridCardClasses } = useDynamicClasses()
const leaderboardStore = useLeaderBoardStore()

const youWin = computed(() => {
  return cards.value.length === gameStore.pairedCards.length * 2
})

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

  leaderboardStore.addLocalStorageLeaderBoard(record)
}

onMounted(() => {
  initGame()
})
</script>
<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 p-6">
    <ScoreBoard :you-win="youWin" :formattedTime="formattedTime" :time-in-seconds="timeInSeconds" @init-game="initGame" />

    <div :class="gameBoardClasses">
      <div :class="gridCardClasses">
        <div class="flex justify-center items-center" v-for="(card, cardIndex) in cards" :key="`card-${cardIndex}`">
          <Card :number="card" @flipped-card="flippedCard"></Card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
