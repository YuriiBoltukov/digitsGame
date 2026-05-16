import type { DigitSortOrder } from '../model/digitSortOrder.types'

export function pickRandomDigitSortOrder(): DigitSortOrder {
  return Math.random() < 0.5 ? 'ascending' : 'descending'
}
