import { describe, expect, it, vi } from 'vitest'

import { shuffleArray } from './shuffleArray'

describe('shuffleArray', () => {
  it('returns a permutation with the same elements', () => {
    const result = shuffleArray([1, 2, 3])

    expect(result).toHaveLength(3)
    expect(result.sort()).toEqual([1, 2, 3])
  })

  it('does not mutate the source array', () => {
    const source = [1, 2, 3]

    shuffleArray(source)

    expect(source).toEqual([1, 2, 3])
  })

  it('returns empty array for empty input', () => {
    expect(shuffleArray([])).toEqual([])
  })
})
