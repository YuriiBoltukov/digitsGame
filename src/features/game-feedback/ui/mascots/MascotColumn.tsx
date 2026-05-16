import { FeedbackMessage } from '@/shared/ui/feedback-message/FeedbackMessage'

import { MASCOT_CONFIG } from './mascotConfig'
import type { MascotProps, MascotSide } from './mascot.types'

import styles from './gameMascots.module.scss'

export function MascotColumn({
  feedback,
  onDismissFeedback,
  side,
}: MascotProps & { side: MascotSide }) {
  const config = MASCOT_CONFIG[side]
  const showBubble = feedback === config.feedbackVariant

  return (
    <aside
      className={`${styles.mascotColumn} ${config.sideClassName}`}
      aria-label={config.ariaLabel}
    >
      <div className={styles.animal}>
        <div
          className={`${styles.speech} ${showBubble ? styles.speechVisible : ''}`}
          aria-hidden={!showBubble}
        >
          {showBubble && (
            <FeedbackMessage
              variant={config.feedbackVariant}
              onDismiss={onDismissFeedback}
              classNames={{
                root: config.bubbleClassName,
                close: styles.bubbleClose,
                text: config.textClassName,
              }}
            />
          )}
        </div>
        <img
          className={styles.animalImg}
          src={config.image}
          alt=""
          width={234}
          height={234}
          decoding="async"
        />
      </div>
    </aside>
  )
}
