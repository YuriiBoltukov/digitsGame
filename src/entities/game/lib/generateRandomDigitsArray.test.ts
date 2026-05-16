import { afterEach, describe, expect, it, vi } from 'vitest'

import { AVAILABLE_DIGITS_LENGTHS } from '../config/game.constants'
import { generateRandomDigitsArray } from './generateRandomDigitsArray'
import * as generateRandomNumberModule from './generateRandomNumber'

describe('generateRandomDigitsArray', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('uses length from AVAILABLE_DIGITS_LENGTHS', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    vi.spyOn(generateRandomNumberModule, 'generateRandomNumber').mockReturnValue(
      7,
    )

    const digits = generateRandomDigitsArray()

    expect(digits).toHaveLength(AVAILABLE_DIGITS_LENGTHS[0])
    expect(digits.every((digit) => digit === 7)).toBe(true)
  })
})
