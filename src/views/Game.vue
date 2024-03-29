<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import Card from '../components/Card.vue'
import { useGameInit } from '../composables/GameInit'
import { useDynamicClasses } from '../composables/DynamicClasses'

const { cards, gameStore, flippedCard, initGame, stopTimer, formattedTime } = useGameInit()
const { gameBoardClasses, gridCardClasses } = useDynamicClasses()

const youWin = computed(() => {
  return cards.value.length === gameStore.pairedCards.length * 2
})

watch(
  () => youWin.value,
  (newVal) => {
    if (newVal) {
      stopTimer()
    }
  },
)

onMounted(() => {
  initGame()
})
</script>
<template>
  <div class="grid grid-cols-3 p-6">
    <div class="justify-center mb-12 text-white">
      <h1 class="text-5xl">Memory Game</h1>
      <p>Paired Cards: {{ gameStore.pairedCards.length }}</p>
      <p>Moves: {{ gameStore.moves }}</p>
      <p v-if="youWin">You Win!!!!!</p>
      <p>Time: {{ formattedTime }}</p>
    </div>

    <div :class="gameBoardClasses">
      <div :class="gridCardClasses">
        <div class="flex justify-center items-center" v-for="i in cards" :key="i">
          <Card :number="i" @flipped-card="flippedCard"></Card>
        </div>
      </div>
    </div>
  </div>
</template>
