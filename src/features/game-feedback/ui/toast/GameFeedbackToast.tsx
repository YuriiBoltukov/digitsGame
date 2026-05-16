import type { GameFeedback } from '@/entities/game/model/gameFeedback.types'
import { FeedbackMessage } from '@/shared/ui/feedback-message/FeedbackMessage'

import styles from './gameFeedbackToast.module.scss'

export type GameFeedbackToastProps = {
  feedback: GameFeedback
  onDismiss: () => void
}

/**
 * Displays temporary game feedback message on compact layouts.
 */
export function GameFeedbackToast({
  feedback,
  onDismiss,
}: GameFeedbackToastProps) {
  if (feedback === null) {
    return null
  }

  const rootClassName =
    feedback === 'success'
      ? `${styles.root} ${styles.rootSuccess}`
      : `${styles.root} ${styles.rootWrong}`

  return (
    <FeedbackMessage
      variant={feedback}
      onDismiss={onDismiss}
      classNames={{
        root: rootClassName,
        close: styles.toastClose,
        text: styles.text,
      }}
    />
  )
}
