import { describe, expect, it } from 'vitest'

import { swapItemsById } from './swapItemsById'

const items = [
  { id: 'a', value: 1 },
  { id: 'b', value: 2 },
  { id: 'c', value: 3 },
]

describe('swapItemsById', () => {
  it('swaps two items by id', () => {
    expect(swapItemsById(items, 'a', 'c')).toEqual([
      { id: 'c', value: 3 },
      { id: 'b', value: 2 },
      { id: 'a', value: 1 },
    ])
  })

  it('returns copy when ids are equal', () => {
    const result = swapItemsById(items, 'a', 'a')

    expect(result).toEqual(items)
    expect(result).not.toBe(items)
  })

  it('returns copy when id is missing', () => {
    expect(swapItemsById(items, 'a', 'missing')).toEqual(items)
  })
})
