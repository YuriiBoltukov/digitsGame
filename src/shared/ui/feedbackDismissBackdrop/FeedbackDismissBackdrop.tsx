import { createPortal } from 'react-dom'

import styles from './feedbackDismissBackdrop.module.scss'

export type FeedbackDismissBackdropProps = {
  ariaLabel: string
  onDismiss: () => void
}

export function FeedbackDismissBackdrop({
  ariaLabel,
  onDismiss,
}: FeedbackDismissBackdropProps) {
  return createPortal(
    <button
      type="button"
      className={styles.backdrop}
      aria-label={ariaLabel}
      onClick={onDismiss}
    />,
    document.body,
  )
}
