import { describe, expect, it } from 'vitest'

import { getDigitsKey } from './getDigitsKey'

describe('getDigitsKey', () => {
  it('joins values with null separator', () => {
    expect(getDigitsKey([1, 2, 3])).toBe('1\u00002\u00003')
  })
})
