import { RandomOrderDigitsHint } from './RandomOrderDigitsHint'
import { RandomOrderDigitsList } from './RandomOrderDigitsList'
import { RandomOrderDigitsTitle } from './RandomOrderDigitsTitle'
import { useOrderDigitsContext } from '../model/orderDigitsContext'

import styles from './randomOrderDigits.module.scss'

export function RandomOrderDigitsContent() {
  const { titleId } = useOrderDigitsContext()

  return (
    <section className={styles.root} aria-labelledby={titleId}>
      <RandomOrderDigitsTitle />
      <RandomOrderDigitsList />
      <RandomOrderDigitsHint />
    </section>
  )
}
