import { describe, expect, it } from 'vitest'

import { moveItemsByIndex } from './moveItemsByIndex'

describe('moveItemsByIndex', () => {
  const items = ['a', 'b', 'c']

  it('moves item forward', () => {
    expect(moveItemsByIndex(items, 0, 2)).toEqual(['b', 'c', 'a'])
  })

  it('moves item backward', () => {
    expect(moveItemsByIndex(items, 2, 0)).toEqual(['c', 'a', 'b'])
  })

  it('returns copy when indices are equal', () => {
    const result = moveItemsByIndex(items, 1, 1)

    expect(result).toEqual(items)
    expect(result).not.toBe(items)
  })
})
