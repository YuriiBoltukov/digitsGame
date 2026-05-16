import { createPortal } from 'react-dom'

import { FeedbackCloseButton } from '@/shared/ui/feedbackCloseButton/FeedbackCloseButton'
import { FeedbackDismissBackdrop } from '@/shared/ui/feedbackDismissBackdrop/FeedbackDismissBackdrop'

import styles from './orderHintToast.module.scss'

export type OrderHintToastProps = {
  message: string
  onDismiss: () => void
}

export function OrderHintToast({ message, onDismiss }: OrderHintToastProps) {
  return createPortal(
    <>
      <FeedbackDismissBackdrop
        ariaLabel="Закрыть подсказку"
        onDismiss={onDismiss}
      />
      <div className={styles.root} role="status">
        <FeedbackCloseButton onClick={onDismiss} className={styles.close} />
        <p className={styles.text}>{message}</p>
      </div>
    </>,
    document.body,
  )
}
