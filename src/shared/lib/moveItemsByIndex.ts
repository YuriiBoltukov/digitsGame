/**
 * Moves an item inside array from one position to another.
 */
export function moveItemsByIndex<T>(
  items: readonly T[],
  fromIndex: number,
  toIndex: number,
): T[] {
  const isSamePosition = fromIndex === toIndex

  if (isSamePosition) {
    return [...items]
  }

  const nextItems = [...items]

  const [movedItem] = nextItems.splice(fromIndex, 1)

  nextItems.splice(toIndex, 0, movedItem)

  return nextItems
}
