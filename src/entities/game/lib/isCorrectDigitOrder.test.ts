import { describe, expect, it } from 'vitest'

import { isCorrectDigitOrder } from './isCorrectDigitOrder'

describe('isCorrectDigitOrder', () => {
  const puzzleDigits = [3, 1, 2]

  it('returns true for ascending match', () => {
    expect(
      isCorrectDigitOrder([1, 2, 3], puzzleDigits, 'ascending'),
    ).toBe(true)
  })

  it('returns true for descending match', () => {
    expect(
      isCorrectDigitOrder([3, 2, 1], puzzleDigits, 'descending'),
    ).toBe(true)
  })

  it('returns false for wrong order', () => {
    expect(
      isCorrectDigitOrder([2, 1, 3], puzzleDigits, 'ascending'),
    ).toBe(false)
  })

  it('returns false when lengths differ', () => {
    expect(
      isCorrectDigitOrder([1, 2], puzzleDigits, 'ascending'),
    ).toBe(false)
  })

  it('returns false for empty puzzle', () => {
    expect(isCorrectDigitOrder([1], [], 'ascending')).toBe(false)
  })
})
