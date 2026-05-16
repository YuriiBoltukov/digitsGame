import { FULL_ORDER_HINT } from '@/entities/game/config/game.constants'
import { useOrderDigitsContext } from '../model/orderDigitsContext'

import styles from './randomOrderDigits.module.scss'

export function RandomOrderDigitsTitle() {
  const { titleId, interactionLocked } = useOrderDigitsContext()

  return (
    <div className={styles.titleBand}>
      <div className={styles.titleRow}>
        <h2 id={titleId} className={styles.title}>
          Текущая последовательность
        </h2>

        <div className={styles.hintWrap}>
          <button
            type="button"
            className={styles.hintTrigger}
            aria-label={`Подробнее: ${FULL_ORDER_HINT}`}
            disabled={interactionLocked}
          >
            <span className={styles.hintTriggerMark} aria-hidden>
              ?
            </span>
          </button>

          <div className={styles.tooltip} aria-hidden="true">
            {FULL_ORDER_HINT}
          </div>
        </div>
      </div>
    </div>
  )
}
