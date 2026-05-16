import { describe, expect, it, vi } from 'vitest'

import * as shuffleArrayModule from '@/shared/lib/shuffleArray'

import { createItems } from './createItems'

describe('createItems', () => {
  it('creates items with stable ids and shuffled values', () => {
    vi.spyOn(shuffleArrayModule, 'shuffleArray').mockReturnValue([3, 1, 2])
    vi.spyOn(crypto, 'randomUUID')
      .mockReturnValueOnce('id-1')
      .mockReturnValueOnce('id-2')
      .mockReturnValueOnce('id-3')

    expect(createItems([1, 2, 3])).toEqual([
      { id: 'id-1', value: 3 },
      { id: 'id-2', value: 1 },
      { id: 'id-3', value: 2 },
    ])
  })
})
