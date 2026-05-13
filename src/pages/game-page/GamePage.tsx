import { Footer } from '../../widgets/Footer/Footer'
import styles from './gamePage.module.scss'

export function GamePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>GamePage</h1>
      </main>
      <Footer />
    </div>
  )
}
