import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import '../mocks/mockAudio';

import { useGame } from '../../src/store/game'

describe('Game store actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('restartGame should leave default values again, for prevent old stored values on restart games', () => {
    const gameStore = useGame()

    gameStore.pairedCards = [1, 2, 10]
    gameStore.checkingPairs = true
    gameStore.lastFlippedCard = 10
    gameStore.moves = 2
    gameStore.reset = false

    gameStore.restartGame()

    expect(gameStore.pairedCards).toEqual([])
    expect(gameStore.checkingPairs).toBe(false)
    expect(gameStore.lastFlippedCard).toBe(0)
    expect(gameStore.moves).toBe(0)
    expect(gameStore.reset).toBe(true)
  })

  it('addMove should push a move number to moves store', () => {
    const gameStore = useGame()

    gameStore.addMove()
    expect(gameStore.moves).toEqual(1)
    expect(gameStore.reset).toBe(false)
  })

  it('addPairedCard should push a card number to the paired cards store', () => {
    const gameStore = useGame()

    gameStore.addPairedCard(5)
    expect(gameStore.pairedCards).toEqual([5])
  })

  it('checkPairs should set to on checkingPairs store and set it to off after 1 second', async () => {
    const gameStore = useGame()
    expect(gameStore.checkingPairs).toBe(false)
    gameStore.checkPairs()
    expect(gameStore.checkingPairs).toBe(true)
    await new Promise(resolve => setTimeout(resolve, 1001))
    expect(gameStore.checkingPairs).toBe(false)
  })
})