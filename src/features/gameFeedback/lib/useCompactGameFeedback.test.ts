import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { COMPACT_GAME_FEEDBACK_MQ } from '@/entities/game/config/game.constants'

import { useCompactGameFeedback } from './useCompactGameFeedback'

function createMatchMedia(matches: boolean) {
  const listeners = new Set<() => void>()

  return {
    matches,
    media: COMPACT_GAME_FEEDBACK_MQ,
    addEventListener: (_: string, listener: () => void) => {
      listeners.add(listener)
    },
    removeEventListener: (_: string, listener: () => void) => {
      listeners.delete(listener)
    },
    emitChange(nextMatches: boolean) {
      this.matches = nextMatches
      listeners.forEach((listener) => listener())
    },
  }
}

describe('useCompactGameFeedback', () => {
  it('returns matchMedia matches value', () => {
    const mediaQuery = createMatchMedia(true)

    vi.stubGlobal('matchMedia', () => mediaQuery)

    const { result } = renderHook(() => useCompactGameFeedback())

    expect(result.current).toBe(true)
  })

  it('updates when media query changes', () => {
    const mediaQuery = createMatchMedia(false)

    vi.stubGlobal('matchMedia', () => mediaQuery)

    const { result } = renderHook(() => useCompactGameFeedback())

    act(() => {
      mediaQuery.emitChange(true)
    })

    expect(result.current).toBe(true)
  })
})
