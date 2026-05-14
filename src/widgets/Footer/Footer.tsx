import styles from './footer.module.scss'

export type FooterProps = {
  onRestart: () => void
}

export function Footer({ onRestart }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <button type="button" className={styles.primaryButton}>
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
