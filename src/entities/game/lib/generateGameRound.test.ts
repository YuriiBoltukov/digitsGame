import { describe, expect, it, vi } from 'vitest'

import { generateGameRound } from './generateGameRound'
import * as generateRandomDigitsArrayModule from './generateRandomDigitsArray'
import * as pickRandomDigitSortOrderModule from './pickRandomDigitSortOrder'

describe('generateGameRound', () => {
  it('combines digits and target order', () => {
    vi.spyOn(
      generateRandomDigitsArrayModule,
      'generateRandomDigitsArray',
    ).mockReturnValue([4, 2, 9])
    vi.spyOn(
      pickRandomDigitSortOrderModule,
      'pickRandomDigitSortOrder',
    ).mockReturnValue('descending')

    expect(generateGameRound()).toEqual({
      digits: [4, 2, 9],
      targetOrder: 'descending',
    })
  })
})
