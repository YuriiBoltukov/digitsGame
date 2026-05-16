import { MAX_RANDOM_NUMBER } from '../config/game.constants'

export function generateRandomNumber(): number {
  return Math.floor(Math.random() * (MAX_RANDOM_NUMBER + 1))
}
