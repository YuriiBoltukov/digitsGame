import styles from './footer.module.scss'

export type FooterProps = {
  onRestart: () => void
  onCheck: () => void
}

export function Footer({ onRestart, onCheck }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <button type="button" className={styles.primaryButton} onClick={onCheck}>
        Проверить ответ
      </button>
      <button
        type="button"
        className={styles.secondaryButton}
        onClick={onRestart}
      >
        Начать заново
      </button>
    </footer>
  )
}
