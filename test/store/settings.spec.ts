import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'

import { useSettings } from '../../src/store/settings'

describe('Settings store actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('updateSoundSetting should toggle sound setting', () => {
    const store = useSettings()
    expect(store.sound).toBe(false)
    store.updateSoundSetting()
    expect(store.sound).toBe(true)
  });

  it('addDifficulty should increment difficulty setting', () => {
    const store = useSettings();
    store.difficulty = 1
    store.addDifficulty()
    expect(store.difficulty).toBe(2)
  });

  it('addDifficulty should restart difficulty value setting to 1 when it reaches 3', () => {
    const store = useSettings()
    store.difficulty = 3
    store.addDifficulty()
    expect(store.difficulty).toBe(1)
  })
})