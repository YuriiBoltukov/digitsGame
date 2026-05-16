import { ACTIVE_HINT, LOCKED_HINT } from '@/entities/game/config/game.constants'
import { useOrderDigitsContext } from '../model/orderDigitsContext'

import styles from './randomOrderDigits.module.scss'

export function RandomOrderDigitsHint() {
  const { shortHintId, interactionLocked } = useOrderDigitsContext()

  return (
    <div className={styles.footerHintSlot} id={shortHintId}>
      <p className={styles.footerHint}>
        {interactionLocked ? LOCKED_HINT : ACTIVE_HINT}
      </p>
    </div>
  )
}
