import type { DigitSortOrder } from '../model/digitSortOrder.types'

export function sortDigits(
  digits: readonly number[],
  sortOrder: DigitSortOrder,
): number[] {
  const sortedDigits = [...digits]

  if (sortOrder === 'ascending') {
    sortedDigits.sort((firstDigit, secondDigit) => firstDigit - secondDigit)
  } else {
    sortedDigits.sort((firstDigit, secondDigit) => secondDigit - firstDigit)
  }

  return sortedDigits
}
