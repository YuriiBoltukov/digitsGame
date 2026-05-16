export function getDigitsKey(values: readonly number[]) {
  return values.join('\0')
}
