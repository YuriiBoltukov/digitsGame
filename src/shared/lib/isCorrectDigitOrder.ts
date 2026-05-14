export function isCorrectDigitOrder(
  userOrder: readonly number[],
  puzzleDigits: readonly number[],
): boolean {
  if (puzzleDigits.length === 0) return false
  const expected = [...puzzleDigits].sort((a, b) => a - b)
  if (userOrder.length !== expected.length) return false
  return userOrder.every((n, i) => n === expected[i])
}
