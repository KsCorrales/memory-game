import { ref } from 'vue'
import { useGame } from '../store/game'
import { useSettings } from '../store/settings'
import { useTimer } from './Timer'
import { useSound } from '../composables/Sound'

export function useGameInit() {
  const gameStore = useGame()
  const settingsStore = useSettings()
  const sound = useSound()
  const { resetTimer, stopTimer, formattedTime, timeInSeconds } = useTimer()

  const cards = ref<number[]>([])

  function resetCards(): void {
    cards.value = [];
  };

  function flippedCard(cardNumber: number): void {
    gameStore.addMove()
    if (settingsStore.sound) {
      sound.playFlipCard()
    }

    if (gameStore.lastFlippedCard !== 0) {
      if (cardNumber === gameStore.lastFlippedCard) {
        pairedCard(cardNumber)
      } else if (cardNumber !== gameStore.lastFlippedCard) {
        unpairedCard(cardNumber)
      }
      gameStore.checkPairs()
    } else {
      gameStore.lastFlippedCard = cardNumber
    }
  }

  function pairedCard(cardNumber: number): void {
    gameStore.addPairedCard(cardNumber)
    gameStore.lastFlippedCard = 0
    if (settingsStore.sound) {
      setTimeout(() => {
        sound.playPairedCards()
      }, gameStore.checkingPairsTimeMs)
    }

  }

  function unpairedCard(cardNumber: number): void {
    gameStore.lastFlippedCard = 0
    if (settingsStore.sound) {
      setTimeout(() => {
        sound.playDownFaceFlipCard()
      }, gameStore.checkingPairsTimeMs)
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
    resetCards()
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
    formattedTime,
    timeInSeconds
  }
}
