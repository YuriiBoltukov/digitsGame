import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createActor } from 'xstate'

import { FEEDBACK_VISIBILITY_DURATION_MS } from '@/entities/game/config/game.constants'

vi.mock('@/entities/game/lib/generateGameRound', () => ({
  generateGameRound: vi.fn(() => ({
    digits: [3, 1, 2],
    targetOrder: 'ascending' as const,
  })),
}))

import { gamePageMachine } from './gamePage.machine'

describe('gamePageMachine', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts in playing.answering', () => {
    const actor = createActor(gamePageMachine).start()

    expect(actor.getSnapshot().matches({ playing: 'answering' })).toBe(true)
    expect(actor.getSnapshot().context).toMatchObject({
      digits: [3, 1, 2],
      targetOrder: 'ascending',
      feedback: null,
      bubbleVisible: false,
    })
  })

  it('transitions to won on correct check', () => {
    const actor = createActor(gamePageMachine).start()

    actor.send({ type: 'CHECK', userOrder: [1, 2, 3] })

    expect(actor.getSnapshot().matches('won')).toBe(true)
    expect(actor.getSnapshot().context.feedback).toBe('success')
    expect(actor.getSnapshot().context.bubbleVisible).toBe(true)
  })

  it('shows wrong feedback on incorrect check', () => {
    const actor = createActor(gamePageMachine).start()

    actor.send({ type: 'CHECK', userOrder: [3, 2, 1] })

    expect(actor.getSnapshot().matches({ playing: 'wrongFeedback' })).toBe(
      true,
    )
    expect(actor.getSnapshot().context.feedback).toBe('wrong')
  })

  it('hides bubble after timeout in wrongFeedback', () => {
    const actor = createActor(gamePageMachine).start()

    actor.send({ type: 'CHECK', userOrder: [3, 2, 1] })
    vi.advanceTimersByTime(FEEDBACK_VISIBILITY_DURATION_MS)

    expect(actor.getSnapshot().matches({ playing: 'answering' })).toBe(true)
    expect(actor.getSnapshot().context.bubbleVisible).toBe(false)
  })

  it('dismisses feedback manually', () => {
    const actor = createActor(gamePageMachine).start()

    actor.send({ type: 'CHECK', userOrder: [3, 2, 1] })
    actor.send({ type: 'DISMISS_FEEDBACK' })

    expect(actor.getSnapshot().context.bubbleVisible).toBe(false)
  })

  it('re-enters wrong feedback on repeated incorrect checks', () => {
    const actor = createActor(gamePageMachine).start()

    actor.send({ type: 'CHECK', userOrder: [3, 2, 1] })
    actor.send({ type: 'CHECK', userOrder: [3, 2, 1] })

    expect(actor.getSnapshot().matches({ playing: 'wrongFeedback' })).toBe(
      true,
    )
  })

  it('starts new game from won state', () => {
    const actor = createActor(gamePageMachine).start()

    actor.send({ type: 'CHECK', userOrder: [1, 2, 3] })
    actor.send({ type: 'NEW_GAME' })

    expect(actor.getSnapshot().matches({ playing: 'answering' })).toBe(true)
    expect(actor.getSnapshot().context.feedback).toBe(null)
    expect(actor.getSnapshot().context.bubbleVisible).toBe(false)
  })
})
