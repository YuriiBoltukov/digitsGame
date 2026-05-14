export function arrayMove<T>(array: readonly T[], from: number, to: number): T[] {
  if (from === to) {
    return [...array]
  }
  const next = [...array]
  const [removed] = next.splice(from, 1)
  next.splice(to, 0, removed)
  return next
}
