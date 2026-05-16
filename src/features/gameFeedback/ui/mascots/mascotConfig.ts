import catImage from '@/assets/cat.png'
import dinosaurImage from '@/assets/dino.png'
import type { GameFeedbackVariant } from '@/entities/game/model/gameFeedback.types'

import type { MascotSide } from './mascot.types'
import styles from './gameMascots.module.scss'

export type MascotConfig = {
  side: MascotSide
  ariaLabel: string
  image: string
  feedbackVariant: GameFeedbackVariant
  sideClassName: string
  bubbleClassName: string
  textClassName: string
}

export const MASCOT_CONFIG: Record<MascotSide, MascotConfig> = {
  left: {
    side: 'left',
    ariaLabel: 'Кот — сообщение при успехе',
    image: catImage,
    feedbackVariant: 'success',
    sideClassName: styles.mascotLeft,
    bubbleClassName: `${styles.bubble} ${styles.bubbleSuccessTailDown}`,
    textClassName: styles.bubbleTitle,
  },
  right: {
    side: 'right',
    ariaLabel: 'Динозавр — сообщение при ошибке',
    image: dinosaurImage,
    feedbackVariant: 'wrong',
    sideClassName: styles.mascotRight,
    bubbleClassName: `${styles.bubble} ${styles.bubbleWrong} ${styles.bubbleWrongTailDown}`,
    textClassName: styles.bubbleText,
  },
}
