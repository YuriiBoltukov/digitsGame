/**
 * Swaps two items in array by their ids.
 */
export function swapItemsById<T extends { id: string }>(
  items: readonly T[],
  firstItemId: string,
  secondItemId: string,
): T[] {
  const firstItemIndex = items.findIndex(
    (item) => item.id === firstItemId,
  )

  const secondItemIndex = items.findIndex(
    (item) => item.id === secondItemId,
  )

  const isInvalidSwap =
    firstItemIndex === -1 ||
    secondItemIndex === -1 ||
    firstItemIndex === secondItemIndex

  if (isInvalidSwap) {
    return [...items]
  }

  const nextItems = [...items]

  ;[nextItems[firstItemIndex], nextItems[secondItemIndex]] = [
    nextItems[secondItemIndex],
    nextItems[firstItemIndex],
  ]

  return nextItems
}
