import { useCallback, useRef, useState } from 'react'
import { CongratsPage } from '../congrats-page/CongratsPage'
import { CorrectOrderDigits } from '../../widgets/CorrectOrderDigits/CorrectOrderDigits'
import { RandomOrderDigits } from '../../widgets/RandomOrderDigits/RandomOrderDigits'
import { Footer } from '../../widgets/Footer/Footer'
import { generateRandomDigitsArray } from '../../shared/lib/generateRandomDigitsArray'
import { isCorrectDigitOrder } from '../../shared/lib/isCorrectDigitOrder'
import styles from './gamePage.module.scss'

type Phase = 'game' | 'congrats'

export function GamePage() {
  const [digits, setDigits] = useState(generateRandomDigitsArray)
  const [phase, setPhase] = useState<Phase>('game')
  const userOrderRef = useRef<number[]>([])

  const handleOrderChange = useCallback((values: number[]) => {
    userOrderRef.current = values
  }, [])

  const handleRestart = useCallback(() => {
    setDigits(generateRandomDigitsArray())
    setPhase('game')
  }, [])

  const handleCheck = useCallback(() => {
    if (isCorrectDigitOrder(userOrderRef.current, digits)) {
      setPhase('congrats')
    }
  }, [digits])

  const handlePlayAgain = useCallback(() => {
    setDigits(generateRandomDigitsArray())
    setPhase('game')
  }, [])

  if (phase === 'congrats') {
    return (
      <div className={styles.page}>
        <CongratsPage onPlayAgain={handlePlayAgain} />
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <CorrectOrderDigits digits={digits} />
        <RandomOrderDigits digits={digits} onOrderChange={handleOrderChange} />
      </main>
      <Footer onRestart={handleRestart} onCheck={handleCheck} />
    </div>
  )
}
