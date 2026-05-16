import styles from './footer.module.scss'

export type FooterProps = {
  onNewGame: () => void
  onCheck: () => void
  showCheckButton: boolean
  showNewGameButton: boolean
}

export function Footer({
  onNewGame,
  onCheck,
  showCheckButton,
  showNewGameButton,
}: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerActions}>
        {showCheckButton && (
          <button
            type="button"
            className={styles.primaryButton}
            onClick={onCheck}
          >
            Проверить ответ
          </button>
        )}

        {showNewGameButton && (
          <button
            type="button"
            className={styles.primaryButton}
            onClick={onNewGame}
          >
            Новая игра
          </button>
        )}
      </div>
    </footer>
  )
}
