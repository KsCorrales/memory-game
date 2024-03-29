<script setup lang="ts">
import { ref, defineEmits, computed, watch } from 'vue'
import { useGame } from '../store/game'
const emit = defineEmits(['flippedCard'])

const props = defineProps({
  number: { type: Number, default: 0 },
})

const gameStore = useGame()
const faceUp = ref(false)

const isPaired = computed((): boolean => {
  return gameStore.pairedCards.includes(props.number)
})

watch(
  () => gameStore.revealing,
  (newVal, oldVal) => {
    if (newVal === false && oldVal === true && isPaired.value === false) {
      faceUp.value = false
    }
  },
)

function flipCard(): void {
  if (!gameStore.revealing && !isPaired.value) {
    faceUp.value = !faceUp.value
    emit('flippedCard', props.number)
  }
}
</script>
<template>
  <div class="flip-card" @click="flipCard">
    <div :class="{ 'flip-card-inner': true, flip: faceUp }">
      <div v-if="faceUp" class="custom-card-front bg-gray-300 rounded-md p-4 w-24 h-40 flex justify-center items-center cursor-pointer">
        <span class="custom-card-number" :class="{ 'rotate-number': faceUp }">{{ number }}</span>
      </div>
      <div v-else class="custom-card-back bg-gray-300 rounded-md p-4 w-24 h-40 flex justify-center items-center cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M0 10a10 10 0 1 1 20 0 10 10 0 0 1-20 0zm11.707-5.707a1 1 0 0 1 1.414 0L14 6.586l1.293-1.293a1 1 0 1 1 1.414 1.414L15.414 8l1.293 1.293a1 1 0 1 1-1.414 1.414L14 9.414l-1.293 1.293a1 1 0 1 1-1.414-1.414L12.586 8 11.293 6.707a1 1 0 0 1 0-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-card-number {
  color: #cd0000;
  @apply absolute font-bold text-6xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
}

.custom-card-back {
  width: 100px;
  height: 150px;
  background-color: #8b0000;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
}

.custom-card-back::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background-color: #cd0000;
  border-radius: 5px;
}

.custom-card-back::after {
  content: '';
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  background-color: #ff0000;
  border-radius: 5px;
}

.custom-card-front {
  width: 100px;
  height: 150px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
}

.custom-card-front::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background-color: #f2f2f2;
  border-radius: 5px;
}

/* Flip card styles */
.flip-card {
  perspective: 1000px;
}

.flip-card-inner {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.flip-card-inner.flip {
  transition: transform 0.6s;
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  position: absolute;
}

.rotate-number {
  transform: rotateY(180deg) translate(50%, -50%);
}
</style>
