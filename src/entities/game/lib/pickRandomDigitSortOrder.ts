import type { DigitSortOrder } from '../model/digitSortOrder.types'

/**
 * Picks ascending or descending order for the current round.
 */
export function pickRandomDigitSortOrder(): DigitSortOrder {
  return Math.random() < 0.5 ? 'ascending' : 'descending'
}
