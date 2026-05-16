import { useCallback, useMemo, useRef } from 'react'
import { useMachine } from '@xstate/react'

import { CorrectOrderDigits } from '@/features/correct-order'
import { Footer } from '@/features/footer'
import {
  GameFeedbackToast,
  LeftMascot,
  RightMascot,
  useCompactGameFeedback,
} from '@/features/game-feedback'
import {
  RandomOrderDigitsHint,
  RandomOrderDigitsList,
  RandomOrderDigitsProvider,
  RandomOrderDigitsTitle,
} from '@/features/sortable-digits'
import { gamePageMachine } from '../model/gamePage.machine'

import styles from './GamePage.module.scss'

export function GamePage() {
  const isCompact = useCompactGameFeedback()

  const [state, send] = useMachine(gamePageMachine)

  const userOrderRef = useRef<number[]>([])

  const { digits, targetOrder, feedback, bubbleVisible } = state.context
  const isWon = state.matches('won')

  const visibleFeedback = useMemo(() => {
    return bubbleVisible ? feedback : null
  }, [bubbleVisible, feedback])

  const layoutClassName = useMemo(() => {
    return isCompact
      ? styles.contentRowMobile
      : styles.contentRowDesktop
  }, [isCompact])

  const handleOrderChange = useCallback((order: number[]) => {
    userOrderRef.current = order
  }, [])

  const handleRestart = useCallback(() => {
    send({ type: 'NEW_GAME' })
  }, [send])

  const handleCheck = useCallback(() => {
    send({
      type: 'CHECK',
      userOrder: userOrderRef.current,
    })
  }, [send])

  const handleDismissFeedback = useCallback(() => {
    send({ type: 'DISMISS_FEEDBACK' })
  }, [send])

  return (
    <>
      <div className={styles.page}>
        <CorrectOrderDigits digits={digits} targetOrder={targetOrder} />

        <RandomOrderDigitsProvider
          digits={digits}
          onOrderChange={handleOrderChange}
          interactionLocked={isWon}
        >
          <main className={styles.main}>
            <div className={styles.mainTitle}>
              <RandomOrderDigitsTitle />
            </div>

            <div className={styles.playScroll}>
              <div className={styles.playScrollInner}>
                <div className={layoutClassName} aria-live="polite">
                  {!isCompact && (
                    <div className={styles.mascotSlot}>
                      <LeftMascot
                        feedback={visibleFeedback}
                        onDismissFeedback={handleDismissFeedback}
                      />
                    </div>
                  )}

                  <div className={styles.gameColumn}>
                    <RandomOrderDigitsList />
                  </div>

                  {!isCompact && (
                    <div className={styles.mascotSlot}>
                      <RightMascot
                        feedback={visibleFeedback}
                        onDismissFeedback={handleDismissFeedback}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.mainHint}>
              <RandomOrderDigitsHint />
            </div>
          </main>
        </RandomOrderDigitsProvider>

        <div className={styles.footerSlot}>
          <Footer
            onNewGame={handleRestart}
            onCheck={handleCheck}
            showCheckButton={!isWon}
            showNewGameButton={isWon}
          />
        </div>
      </div>

      {isCompact && (
        <GameFeedbackToast
          feedback={visibleFeedback}
          onDismiss={handleDismissFeedback}
        />
      )}
    </>
  )
}
