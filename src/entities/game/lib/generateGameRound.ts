import type { GameRound } from '../model/gameRound.types'
import { generateRandomDigitsArray } from './generateRandomDigitsArray'
import { pickRandomDigitSortOrder } from './pickRandomDigitSortOrder'

/**
 * Generates digits and a random target sort direction for a new round.
 */
export function generateGameRound(): GameRound {
  return {
    digits: generateRandomDigitsArray(),
    targetOrder: pickRandomDigitSortOrder(),
  }
}
