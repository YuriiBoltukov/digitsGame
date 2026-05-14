export function arrayMove<T>(array: readonly T[], from: number, to: number): T[] {
  if (from === to) {
    return [...array]
  }
  const next = [...array]
  const [removed] = next.splice(from, 1)
  next.splice(to, 0, removed)
  return next
}

export function swapItemsById<T extends { id: string }>(
  items: readonly T[],
  idA: string,
  idB: string,
): T[] {
  const i = items.findIndex((x) => x.id === idA)
  const j = items.findIndex((x) => x.id === idB)
  if (i === -1 || j === -1 || i === j) {
    return [...items]
  }
  const next = [...items]
  ;[next[i], next[j]] = [next[j], next[i]]
  return next
}
