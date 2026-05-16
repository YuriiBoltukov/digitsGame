import { afterEach, describe, expect, it, vi } from 'vitest'

import { MAX_RANDOM_NUMBER } from '../config/game.constants'
import { generateRandomNumber } from './generateRandomNumber'

describe('generateRandomNumber', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns integer in range 0..MAX_RANDOM_NUMBER', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)

    expect(generateRandomNumber()).toBe(
      Math.floor(0.5 * (MAX_RANDOM_NUMBER + 1)),
    )
  })

  it('returns 0 when random is 0', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    expect(generateRandomNumber()).toBe(0)
  })
})
