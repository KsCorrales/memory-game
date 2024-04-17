import { useGame } from '../store/game'
import { useSettings } from '../store/settings'
import { useTimer } from './Timer'
import { useSound } from '../composables/Sound'
import { useCards } from './Cards'
import { LeaderboardRecord } from '@/utils/Types'
import { useLeaderBoardStore } from '@/store/leaderBoard'

export function useGameInit() {
  const { cards, setCardsValue, resetCards, generatePairsOfCards, shuffleCards } = useCards()
  const sound = useSound()
  const { resetTimer, stopTimer, formattedTime, timeInSeconds } = useTimer()

  const gameStore = useGame()
  const settingsStore = useSettings()
  const leaderboardStore = useLeaderBoardStore()

  function flippedCard(cardNumber: number): void {
    gameStore.addMove()
    if (settingsStore.sound) {
      sound.playFlipCard()
    }

    if (gameStore.lastFlippedCard !== 0) {
      if (cardNumber === gameStore.lastFlippedCard) {
        pairedCard(cardNumber)
      } else if (cardNumber !== gameStore.lastFlippedCard) {
        unpairedCard()
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

  function unpairedCard(): void {
    gameStore.lastFlippedCard = 0
    if (settingsStore.sound) {
      setTimeout(() => {
        sound.playDownFaceFlipCard()
      }, gameStore.checkingPairsTimeMs)
    }
  }

  function gameOver() {
    stopTimer()
    const record: LeaderboardRecord = {
      moves: gameStore.moves,
      time: timeInSeconds.value,
      difficulty: settingsStore.difficulty,
      name: settingsStore.name || 'John Doe',
    }

    leaderboardStore.addLocalStorageLeaderBoard(record)
  }

  function initGame(): void {
    resetCards()
    gameStore.restartGame()
    setCardsValue(shuffleCards(generatePairsOfCards(settingsStore.cardsLength)))
    resetTimer()
  }

  return {
    cards,
    flippedCard,
    initGame,
    gameOver,
    formattedTime,
    timeInSeconds,
    pairedCard,
    unpairedCard
  }
}
