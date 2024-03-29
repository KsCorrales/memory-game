import '../mocks/mockAudio';
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGameInit } from '../../src/composables/GameInit'

describe('useGameInit', () => {
  // to prevent restart the store/states
  let pinia
  let gameInit

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)

    gameInit = useGameInit()
    gameInit.initGame()
  })

  it('cards array is initialized with correct length on game starts', () => {
    expect(gameInit.cards.value).toHaveLength(8)
  })

  it('flippedCard flips one card and set lastFlippedCard in store', () => {
    gameInit.flippedCard(1)
    expect(gameInit.gameStore.lastFlippedCard).toBe(1)
  })

  it('initGame resets the game, timers and store values', () => {
    const { gameStore, formattedTime } = gameInit
    gameStore.lastFlippedCard = 5
    const initialTime = formattedTime.value

    gameInit.initGame()
    expect(gameStore.lastFlippedCard).toBe(0)
    expect(gameStore.moves).toBe(0)
    expect(formattedTime.value).toBe(initialTime)
  })
})