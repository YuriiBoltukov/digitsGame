import { RandomOrderDigitsContent } from './RandomOrderDigitsContent'
import { RandomOrderDigitsProvider } from './RandomOrderDigitsProvider'
import type { RandomOrderDigitsProps } from '../model/orderDigitsTypes'

export type { RandomOrderDigitsProps } from '../model/orderDigitsTypes'

export { RandomOrderDigitsProvider } from './RandomOrderDigitsProvider'
export { RandomOrderDigitsTitle } from './RandomOrderDigitsTitle'
export { RandomOrderDigitsList } from './RandomOrderDigitsList'
export { RandomOrderDigitsHint } from './RandomOrderDigitsHint'

export function RandomOrderDigits(props: RandomOrderDigitsProps) {
  return (
    <RandomOrderDigitsProvider {...props}>
      <RandomOrderDigitsContent />
    </RandomOrderDigitsProvider>
  )
}
