import { describe, expect, it } from 'vitest'

import { sortDigits } from './sortDigits'

describe('sortDigits', () => {
  it('sorts ascending', () => {
    expect(sortDigits([3, 1, 2], 'ascending')).toEqual([1, 2, 3])
  })

  it('sorts descending', () => {
    expect(sortDigits([3, 1, 2], 'descending')).toEqual([3, 2, 1])
  })

  it('does not mutate the source array', () => {
    const digits = [3, 1, 2]

    sortDigits(digits, 'ascending')

    expect(digits).toEqual([3, 1, 2])
  })
})
