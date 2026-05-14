import { useId, useMemo } from 'react'
import styles from './correctOrderDigits.module.scss'

export type CorrectOrderDigitsProps = {
  digits: number[]
}

export function CorrectOrderDigits({ digits }: CorrectOrderDigitsProps) {
  const subtitleId = useId()
  const sorted = useMemo(
    () => [...digits].sort((a, b) => a - b),
    [digits],
  )

  if (sorted.length === 0) {
    return null
  }

  return (
    <section
      className={styles.root}
      aria-labelledby={subtitleId}
    >
      <h2 id={subtitleId} className={styles.subtitle}>
        Правильный порядок
      </h2>
      <div className={styles.row} role="list">
        {sorted.map((digit, index) => (
          <span key={`${digit}-${index}`} className={styles.cell} role="listitem">
            {digit}
          </span>
        ))}
      </div>
    </section>
  )
}
