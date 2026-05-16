import { useId, useMemo } from 'react'

import { DIGIT_SORT_ORDER_LABEL } from '@/entities/game/config/game.constants'
import type { DigitSortOrder } from '@/entities/game/model/digitSortOrder.types'
import { sortDigits } from '@/entities/game/lib/sortDigits'

import styles from './correctOrderDigits.module.scss'

export type CorrectOrderDigitsProps = {
  digits: number[]
  targetOrder: DigitSortOrder
}

/**
 * Displays digits in the correct order for the current round.
 */
export function CorrectOrderDigits({
  digits,
  targetOrder,
}: CorrectOrderDigitsProps) {
  const titleId = useId()

  const sortedDigits = useMemo(() => {
    return sortDigits(digits, targetOrder)
  }, [digits, targetOrder])

  const hasDigits = sortedDigits.length > 0

  if (!hasDigits) {
    return null
  }

  return (
    <header
      className={styles.root}
      aria-labelledby={titleId}
    >
      <h2
        id={titleId}
        className={styles.title}
      >
        Правильный порядок ({DIGIT_SORT_ORDER_LABEL[targetOrder]})
      </h2>

      <div
        className={styles.row}
        role="list"
      >
        {sortedDigits.map((digit, index) => {
          const digitKey = `${digit}-${index}`

          return (
            <span
              key={digitKey}
              className={styles.cell}
              role="listitem"
            >
              {digit}
            </span>
          )
        })}
      </div>
    </header>
  )
}
