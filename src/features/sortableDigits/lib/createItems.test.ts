import { describe, expect, it, vi } from 'vitest'

import * as shuffleArrayModule from '@/shared/lib/shuffleArray'

import { createItems } from './createItems'

describe('createItems', () => {
  it('creates items with stable ids and shuffled values', () => {
    vi.spyOn(shuffleArrayModule, 'shuffleArray').mockReturnValue([3, 1, 2])
    const id1 = '00000000-0000-4000-8000-000000000001'
    const id2 = '00000000-0000-4000-8000-000000000002'
    const id3 = '00000000-0000-4000-8000-000000000003'

    vi.spyOn(crypto, 'randomUUID')
      .mockReturnValueOnce(id1)
      .mockReturnValueOnce(id2)
      .mockReturnValueOnce(id3)

    expect(createItems([1, 2, 3])).toEqual([
      { id: id1, value: 3 },
      { id: id2, value: 1 },
      { id: id3, value: 2 },
    ])
  })
})
