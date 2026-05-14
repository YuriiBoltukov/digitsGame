import { useCallback, useState } from 'react'
import { CorrectOrderDigits } from '../../widgets/CorrectOrderDigits/CorrectOrderDigits'
import { RandomOrderDigits } from '../../widgets/RandomOrderDigits/RandomOrderDigits'
import { Footer } from '../../widgets/Footer/Footer'
import { generateRandomDigitsArray } from '../../shared/lib/generateRandomDigitsArray'
import styles from './gamePage.module.scss'

export function GamePage() {
  const [digits, setDigits] = useState(generateRandomDigitsArray)

  const handleRestart = useCallback(() => {
    setDigits(generateRandomDigitsArray())
  }, [])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <CorrectOrderDigits digits={digits} />
        <RandomOrderDigits digits={digits} />
      </main>
      <Footer onRestart={handleRestart} />
    </div>
  )
}
