import { createPortal } from 'react-dom'

import type { GameFeedback } from '@/entities/game/model/gameFeedback.types'
import { FeedbackMessage } from '@/shared/ui/feedbackMessage/FeedbackMessage'

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

  return createPortal(
    <>
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Закрыть уведомление"
        onClick={onDismiss}
      />
      <FeedbackMessage
        variant={feedback}
        onDismiss={onDismiss}
        classNames={{
          root: rootClassName,
          close: styles.toastClose,
          text: styles.text,
        }}
      />
    </>,
    document.body,
  )
}
