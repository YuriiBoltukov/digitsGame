import styles from './footer.module.scss'

export function Footer() {
  return (
        <footer className={styles.footer}>
            <button type="button" className={styles.primaryButton}>
              проверить ответ
            </button>
            <button type="button" className={styles.secondaryButton}>
              начать заново
            </button>
        </footer>
    )
}
