import { useCallback, useState } from 'react'

import { FULL_ORDER_HINT } from '@/entities/game/config/game.constants'

import { useOrderDigitsContext } from '../model/orderDigitsContext'
import { OrderHintToast } from './OrderHintToast'

import styles from './randomOrderDigits.module.scss'

export function RandomOrderDigitsTitle() {
  const { titleId, interactionLocked } = useOrderDigitsContext()
  const [isHintToastVisible, setIsHintToastVisible] = useState(false)

  const handleHintClick = useCallback(() => {
    if (interactionLocked) {
      return
    }

    setIsHintToastVisible((current) => !current)
  }, [interactionLocked])

  const handleDismissHint = useCallback(() => {
    setIsHintToastVisible(false)
  }, [])

  return (
    <>
      <div className={styles.titleBand}>
        <div className={styles.titleRow}>
          <div className={styles.titleGroup}>
            <h2 id={titleId} className={styles.title}>
              Текущая последовательность
            </h2>

            <div className={styles.hintWrap}>
              <button
                type="button"
                className={styles.hintTrigger}
                aria-label={`Подробнее: ${FULL_ORDER_HINT}`}
                aria-expanded={isHintToastVisible}
                disabled={interactionLocked}
                onClick={handleHintClick}
              >
                <span className={styles.hintTriggerMark} aria-hidden>
                  ?
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isHintToastVisible && (
        <OrderHintToast
          message={FULL_ORDER_HINT}
          onDismiss={handleDismissHint}
        />
      )}
    </>
  )
}
