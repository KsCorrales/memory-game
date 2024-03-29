<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useSettings } from '../store/settings'
import { useGame } from '../store/game'
import Card from '../components/Card.vue'

const settingsStore = useSettings()
const gameStore = useGame()

const cards = ref<number[]>([])

function generatePairs(cardsNumber: number): number[] {
  let pairs: number[] = []

  for (let n = 1; n <= cardsNumber / 2; n++) {
    pairs.push(n, n)
  }

  return pairs
}

function shuffleCards(array: number[]): number[] {
  let currentIndex = array.length

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

function initGame(): void {
  const shuffledCards = shuffleCards(generatePairs(settingsStore.cardsLength))
  cards.value = shuffledCards
}

function flippedCard(cardNumber: number): void {
  if (gameStore.lastFlippedCard !== 0) {
    if (cardNumber === gameStore.lastFlippedCard) {
      gameStore.addPairedCard(cardNumber)
      gameStore.lastFlippedCard = 0
    } else if (cardNumber !== gameStore.lastFlippedCard) {
      gameStore.lastFlippedCard = 0
    }
    gameStore.reveal()
  } else {
    gameStore.lastFlippedCard = cardNumber
  }
}

onMounted(() => {
  initGame()
})

const gameBoardClasses = computed(() => {
  switch (settingsStore.difficulty) {
    case 3:
      return 'flex justify-center items-center col-span-2'
    case 1:
      return 'flex h-screen justify-center items-center'
    default:
      return 'flex justify-center items-center'
  }
})

const gridCardClasses = computed(() => {
  switch (settingsStore.difficulty) {
    case 3:
      return 'grid grid-rows-4 grid-flow-col gap-4'
    case 2:
      return 'grid grid-rows-4 grid-flow-col gap-4'
    default:
      return 'grid grid-rows-2 grid-cols-4 grid-flow-col gap-4'
  }
})
</script>
<template>
  <div class="grid grid-cols-3 p-6">
    <div class="justify-center mb-12">
      <h1 class="text-5xl">Game</h1>
      <p>Paired Cards: {{ gameStore.pairedCards }}</p>
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
