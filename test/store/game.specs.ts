import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'

import { useGame } from '../../src/store/game'

describe('Game store actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('restartGame should leave default values again, for prevent old stored values on restart games', () => {
    const store = useGame()
    store.restartGame()
    expect(store.pairedCards).toBe([])
    expect(store.revealing).toBe(false)
    expect(store.lastFlippedCard).toBe(0)
  });

  it('addPairedCard should push a card number to the paired cards store', () => {
    const store = useGame()
    expect(store.pairedCards).toBe([])
    store.addPairedCard(5)
    expect(store.pairedCards).toBe([5])
  });

  it('reveal should set to on revealing store and set it to off after 1 second', async () => {
    const store = useGame()
    expect(store.revealing).toBe(false)
    store.reveal()
    expect(store.revealing).toBe(true)
    await new Promise(resolve => setTimeout(resolve, 1001))
    expect(store.revealing).toBe(false)
  });
})