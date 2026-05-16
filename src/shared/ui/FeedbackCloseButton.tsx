import styles from './feedbackCloseButton.module.scss'

type FeedbackCloseButtonProps = {
  onClick: () => void
  className?: string
}

export function FeedbackCloseButton({
  onClick,
  className,
}: FeedbackCloseButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.closeButton} ${className ?? ''}`.trim()}
      onClick={onClick}
      aria-label="Закрыть сообщение"
    >
      <span className={styles.closeMark} aria-hidden>
        // TODO: Use SVG
        ×
      </span>
    </button>
  )
}
