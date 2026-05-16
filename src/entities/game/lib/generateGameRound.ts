import type { GameRound } from '../model/gameRound.types'
import { generateRandomDigitsArray } from './generateRandomDigitsArray'
import { pickRandomDigitSortOrder } from './pickRandomDigitSortOrder'

export function generateGameRound(): GameRound {
  return {
    digits: generateRandomDigitsArray(),
    targetOrder: pickRandomDigitSortOrder(),
  }
}
