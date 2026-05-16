import { FeedbackMessage } from '../../shared/ui/FeedbackMessage'
import type { GameFeedback } from '../../shared/types/gameFeedback.types'

import styles from './gameFeedbackToast.module.scss'

export type GameFeedbackToastProps = {
  feedback: GameFeedback
  onDismiss: () => void
}

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
