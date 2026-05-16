import { MAX_RANDOM_NUMBER } from '../config/game.constants'

/**
 * Generates random number in range 0..50.
 */
export function generateRandomNumber(): number {
  return Math.floor(Math.random() * (MAX_RANDOM_NUMBER + 1))
}
