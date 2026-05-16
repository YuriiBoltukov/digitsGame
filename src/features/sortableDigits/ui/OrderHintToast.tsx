import { createPortal } from 'react-dom'

import { FeedbackCloseButton } from '@/shared/ui/feedbackCloseButton/FeedbackCloseButton'

import styles from './orderHintToast.module.scss'

export type OrderHintToastProps = {
  message: string
  onDismiss: () => void
}

export function OrderHintToast({ message, onDismiss }: OrderHintToastProps) {
  return createPortal(
    <>
      <button
        type="button"
        className={styles.backdrop}
        aria-label="Закрыть подсказку"
        onClick={onDismiss}
      />
      <div
        className={styles.root}
        role="status"
        onClick={(event) => event.stopPropagation()}
      >
        <FeedbackCloseButton onClick={onDismiss} className={styles.close} />
        <p className={styles.text}>{message}</p>
      </div>
    </>,
    document.body,
  )
}
