import { ref } from 'vue'
import { useGame } from '../store/game'
import { useSettings } from '../store/settings'
import { useTimer } from './Timer'

export function useGameInit() {
  const gameStore = useGame()
  const settingsStore = useSettings()
  const { resetTimer, stopTimer, formattedTime } = useTimer()

  const cards = ref<number[]>([])

  function flippedCard(cardNumber: number): void {
    gameStore.addMove()
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
    gameStore.restartGame()
    const shuffledCards = shuffleCards(generatePairs(settingsStore.cardsLength))
    cards.value = shuffledCards
    resetTimer()
  }

  return {
    cards,
    flippedCard,
    initGame,
    gameStore,
    settingsStore,
    stopTimer,
    resetTimer,
    formattedTime
  }
}
