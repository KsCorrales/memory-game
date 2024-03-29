import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { useTimer } from '../../src/composables/Timer'

function advanceTimersByTime(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

describe('useTimer', () => {
  const { formattedTime, stopTimer, resetTimer } = useTimer()

  beforeEach(() => {
    resetTimer()
  })

  afterEach(() => {
    stopTimer()
  })

  it('formattedTime returns theformatted string', () => {
    expect(formattedTime.value).toBe('00:00')
  })

  it('startTimer start', async () => {
    await advanceTimersByTime(3000)
    expect(formattedTime.value).toBe('00:02') // for time discrepancy
  })

  it('stopTimer stops the timer (set interval function must stop)', async () => {
    await advanceTimersByTime(1000)
    expect(formattedTime.value).toBe('00:01')
    stopTimer()
    await advanceTimersByTime(3000)
    expect(formattedTime.value).toBe('00:01')
  })

  it('resetTimer the timer must reset to 0 and start it again', async () => {
    await advanceTimersByTime(5000)
    resetTimer()
    expect(formattedTime.value).toBe('00:00')
  })
})