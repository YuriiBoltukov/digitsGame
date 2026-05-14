const LENGTH_OPTIONS = [5, 7, 10] as const

export function generateRandomDigitsArray(): number[] {
  const length =
    LENGTH_OPTIONS[Math.floor(Math.random() * LENGTH_OPTIONS.length)]
  return Array.from({ length }, () => Math.floor(Math.random() * 51))
}
