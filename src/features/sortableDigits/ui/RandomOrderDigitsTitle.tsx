import { useCallback, useState } from 'react'

import { FULL_ORDER_HINT } from '@/entities/game/config/game.constants'
import { useCompactGameFeedback } from '@/features/gameFeedback'

import { useOrderDigitsContext } from '../model/orderDigitsContext'
import { OrderHintToast } from './OrderHintToast'

import styles from './randomOrderDigits.module.scss'

export function RandomOrderDigitsTitle() {
  const { titleId, interactionLocked } = useOrderDigitsContext()
  const isCompact = useCompactGameFeedback()
  const [isHintToastVisible, setIsHintToastVisible] = useState(false)

  const handleHintClick = useCallback(() => {
    if (isCompact) {
      setIsHintToastVisible(true)
    }
  }, [isCompact])

  const handleDismissHint = useCallback(() => {
    setIsHintToastVisible(false)
  }, [])

  const hintWrapClassName = isCompact
    ? `${styles.hintWrap} ${styles.hintWrapCompact}`
    : styles.hintWrap

  return (
    <>
      <div className={styles.titleBand}>
        <div className={styles.titleRow}>
          <h2 id={titleId} className={styles.title}>
            Текущая последовательность
          </h2>

          <div className={hintWrapClassName}>
            <button
              type="button"
              className={styles.hintTrigger}
              aria-label={`Подробнее: ${FULL_ORDER_HINT}`}
              aria-expanded={isCompact ? isHintToastVisible : undefined}
              disabled={interactionLocked}
              onClick={handleHintClick}
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

      {isCompact && isHintToastVisible && (
        <OrderHintToast
          message={FULL_ORDER_HINT}
          onDismiss={handleDismissHint}
        />
      )}
    </>
  )
}
