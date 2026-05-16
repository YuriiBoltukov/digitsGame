import { afterEach, describe, expect, it, vi } from 'vitest'

import { pickRandomDigitSortOrder } from './pickRandomDigitSortOrder'

describe('pickRandomDigitSortOrder', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns ascending when random < 0.5', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1)

    expect(pickRandomDigitSortOrder()).toBe('ascending')
  })

  it('returns descending when random >= 0.5', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9)

    expect(pickRandomDigitSortOrder()).toBe('descending')
  })
})
