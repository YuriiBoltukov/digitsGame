import { AVAILABLE_DIGITS_LENGTHS } from '../config/game.constants'
import { generateRandomNumber } from './generateRandomNumber'

export function generateRandomDigitsArray(): number[] {
  const randomLengthIndex = Math.floor(
    Math.random() * AVAILABLE_DIGITS_LENGTHS.length,
  )

  const digitsLength =
    AVAILABLE_DIGITS_LENGTHS[randomLengthIndex]

  return Array.from(
    { length: digitsLength },
    () => generateRandomNumber(),
  )
}
