import type { DigitSortOrder } from '../model/digitSortOrder.types'
import { sortDigits } from './sortDigits'

/**
 * Checks whether user order matches the puzzle digits
 * in the required ascending or descending order.
 */
export function isCorrectDigitOrder(
  userOrder: readonly number[],
  puzzleDigits: readonly number[],
  sortOrder: DigitSortOrder,
): boolean {
  const hasPuzzleDigits = puzzleDigits.length > 0

  if (!hasPuzzleDigits) {
    return false
  }

  const expectedOrder = sortDigits(puzzleDigits, sortOrder)

  const hasValidLength =
    userOrder.length === expectedOrder.length

  if (!hasValidLength) {
    return false
  }

  return userOrder.every(
    (digit, index) => digit === expectedOrder[index],
  )
}
