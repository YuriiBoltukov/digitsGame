import styles from './congratsPage.module.scss'

export type CongratsPageProps = {
  onPlayAgain: () => void
}

export function CongratsPage({ onPlayAgain }: CongratsPageProps) {
  return (
    <div className={styles.root}>
      <main className={styles.main}>
        <h1 className={styles.title}>Поздравляем!</h1>
        <p className={styles.text}>Цифры расставлены в правильном порядке.</p>
        <button type="button" className={styles.button} onClick={onPlayAgain}>
          Играть снова
        </button>
      </main>
    </div>
  )
}
