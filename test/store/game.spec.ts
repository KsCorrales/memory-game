import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'

import { useGame } from '../../src/store/game'

describe('Game store actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('restartGame should leave default values again, for prevent old stored values on restart games', () => {
    const gameStore = useGame();

    gameStore.pairedCards = [1, 2, 10];
    gameStore.revealing = true;
    gameStore.lastFlippedCard = 10;

    gameStore.restartGame();

    expect(gameStore.pairedCards).toEqual([]);
    expect(gameStore.revealing).toBe(false);
    expect(gameStore.lastFlippedCard).toBe(0);
  });

  it('addPairedCard should push a card number to the paired cards store', () => {
    const gameStore = useGame();

    gameStore.addPairedCard(5);

    expect(gameStore.pairedCards).toEqual([5]);
  });

  it('reveal should set to on revealing store and set it to off after 1 second', async () => {
    const gameStore = useGame()
    expect(gameStore.revealing).toBe(false)
    gameStore.reveal()
    expect(gameStore.revealing).toBe(true)
    await new Promise(resolve => setTimeout(resolve, 1001))
    expect(gameStore.revealing).toBe(false)
  });
})